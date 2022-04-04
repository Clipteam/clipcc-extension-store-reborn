import express from "express";
import {
    getExtension,
    saveExtension,
    login,
    deleteExtension
} from './api.mjs';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT||3001;
const upload = multer()
const cookies = cookieParser(process.env.secret||'32uiefwu3knssewffwe')

app.use(express.static('./dist'));
app.use('/extension', express.static('./extension'));

app.get('/api/getExtension', getExtension);
app.post('/api/saveExtension', upload.fields([{ name: 'extensionFile', maxCount: 1 }, { name: 'iconFile', maxCount: 1 }]),cookies, saveExtension);
app.post('/api/deleteExtension', bodyParser.json(),cookies,deleteExtension);
app.post('/api/login', bodyParser.json(),cookies,login)
  
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({error: 'server error'});
});
app.listen(port, () => {
    console.log(`app listening http://localhost:${port}`);
})