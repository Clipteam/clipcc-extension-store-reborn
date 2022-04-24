import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs-extra';
import path from 'path';
import bcrypt from 'bcrypt';

/** @type {import('sqlite').Database} */
let db;
(async () => {
    db = await open({
      filename: './database.sqlite3',
      driver: sqlite3.Database
    })
})()


export async function getExtension(req, res) {
    if (!db) return res.status(500).json({error:'database not initialize!'})
    let dbdata;
    if (req.query.showHidden) {
        dbdata = await db.all('SELECT * FROM extension')
    } else {
        dbdata = await db.all(`SELECT * FROM extension WHERE hidden = 'false'${req.query.community?'AND community = \'true\'' : req.query.desktop ? '' : 'AND desktop = \'false\''}`);
    }
    dbdata.forEach(d => {
        d['community'] = JSON.parse(d.community)
        d['desktop'] = JSON.parse(d.desktop)
        d['hidden'] = JSON.parse(d.hidden)
    });
    return res.json(dbdata);
}

export async function getExtensionById(req, res) {
    if (!req.query.id || !req.query.version) return res.status(400).send('');
    const data = await db.get('SELECT * FROM extension WHERE extensionId = ?', req.query.id)
    if (!data) return res.status(404).json({'error': 'extension not found'})
    if (data.community == 'false') return res.status(403).json({'error': 'extension unavailable by community version'})
    const ext = path.resolve('extension', `${req.query.id}@${req.query.version}.ccx`);
    
    try {
        await fs.stat(ext)
    } catch {
        return res.status(404).json({error: 'version not found!!!1'})
    }
    return res.sendFile(ext);
}

export async function saveExtension(req, res) {
    if (!db) return res.status(500).json({error:'database not initialize!'})
    if (!userIsLogin(req)) return res.status(403).json({error:'not login'})
    const body = req.body
    const file = req.files['extensionFile']
    const icon = req.files['iconFile']
    if (body?.id) {
        await db.run('UPDATE extension SET extensionId = ?,name = ?,description = ?,author = ?,version = ?,community = ?,desktop = ?,hidden = ? WHERE id = ?', 
            body.extensionId,
            body.name,
            body.description,
            body.author,
            body.version,
            body.community,
            body.desktop,
            body.hidden,
            body.id
        );
    } else {
        if (!file) return res.status(422).json({error: '请上传扩展文件'})
        const result = await db.run('INSERT INTO extension (extensionId,name,description,author,version,community,desktop,hidden) VALUES (?,?,?,?,?,?,?)',
            body.extensionId,
            body.name,
            body.description,
            body.author,
            body.version,
            body.community,
            body.desktop,
            body.hidden
        )
        body.id = result.lastID
    }
    if (file) {
        const name = `${body.extensionId}@${body.version}.ccx`;
        await fs.writeFile(`extension/${name}`, file[0].buffer)
        await db.run('UPDATE extension SET filename = ? WHERE id = ?',
            name,
            body.id
        )
    }
    if (icon) {
        await fs.writeFile(`extension/image/${body.extensionId}.png`, icon[0].buffer)
        await db.run('UPDATE extension SET image = ? WHERE id = ?',
            `${body.extensionId}.png`,
            body.id
        )
    }
    return res.json({})
}

export async function deleteExtension(req, res) {
    if (!userIsLogin(req)) return res.status(403).json({error:'not login'})
    const eId = req.body.id
    if (!eId) {
        return req.status(422).json({error: 'id is required'})
    }
    await db.run('DELETE FROM extension WHERE id = ?', eId)
    return res.json({})
}

export async function login(req, res) {
    const username = req.body.username
    const password = req.body.password
    if (!username || !password) {
        return res.status(422).json({error: 'username and password is required'})
    }
    try {
        const user = await db.get('SELECT * FROM user WHERE username = ?', username)
        const result = await bcrypt.compare(password, user.password);
        if (!result) throw new Error('password wrong');
        res.cookie('user', user.id, {signed: true})
    } catch (err) {
        return res.status(403).json({error: 'username or password wrong'})
    }
    return res.json({messgae: 'success'})
}

function userIsLogin(req) {
    return typeof req.signedCookies.user === 'string';
}

export function generatePassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}