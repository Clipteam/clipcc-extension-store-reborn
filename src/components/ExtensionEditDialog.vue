<template>
    <v-dialog
      v-model="dialog"
      height="500"
      persistent
    >
      <v-card width="500">
        <v-card-title>
          <span class="text-h5">{{isCreate ? '添加': '编辑'}}扩展</span>
        </v-card-title>
        <p class="grey">Tips: 正常情况下会从扩展文件内自动获取，无需手动输入</p>
        <v-form @submit="saveExtension()">
          <v-card-text>
                <v-text-field
                    label="扩展ID"
                    variant="underlined"
                    :rules="[v => !!v || '请输入扩展ID']"
                    v-model="extension.extensionId"
                    required
                ></v-text-field>
                <v-text-field
                    label="扩展名"
                    :rules="[v => !!v || '请输入扩展名']"
                    variant="underlined"
                    v-model="extension.name"
                    required
                ></v-text-field>
                <v-text-field
                    label="作者"
                    :rules="[v => !!v || '请输入作者']"
                    variant="underlined"
                    v-model="extension.author"
                    required
                ></v-text-field>
                <v-text-field
                    label="版本"
                    :rules="[v => !!v || '请输入版本']"
                    variant="underlined"
                    v-model="extension.version"
                    required
                ></v-text-field>
                <v-file-input
                    variant="underlined"
                    accept=".ccx"
                    v-model="extensionFile"
                    @change="readExtension()"
                    label="扩展文件"
                ></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              text
              @click="dialog = false"
            >
              关闭
            </v-btn>
            <v-btn
              color="blue-darken-1"
              text
              type="submit"
              :disabled="dialogStatus == 'SUBMITING'"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script>
import JSZip from 'jszip';

export default {
    expose: ['openDialog'],
    emits: ['onSave'],
    name: 'extension-edit-dialog',
    methods: {
        openDialog(item, isCreate) {
            this.dialog = true
            this.isCreate = isCreate
            this.extension = {}
            if (!isCreate) {
              this.extension = item
            }
        },
        async readExtension() {
          if (!this.extensionFile) return;
          try {
            const extensionFile = await this.extensionFile[0].arrayBuffer()
            const zip = await JSZip.loadAsync(extensionFile)
            const info = await zip.file('info.json').async('string')
            const infoJson = JSON.parse(info);
            this.extension.extensionId = infoJson.id;
            this.extension.author = infoJson.author;
            this.extension.version = infoJson.version;
          } catch (err) {
            console.error(err)
          }
        },
        async saveExtension() {
            this.dialogStatus = 'SUBMITING'
            let extension = this.extension
            if (this.extensionFile[0]) {
                const file = this.extensionFile[0]
                extension = Object.assign(this.extension,{
                    extensionFile: file
                })
            }
            const formData = new FormData()
            for (const key in extension) {
                formData.append(key, extension[key]);
            }
            try {
              const response = await fetch('api/SaveExtension', {
                method: 'post',
                body: formData
              })
              await response.json();
              this.dialog = false;
              this.dialogStatus = 'WAITING';
              this.$emit('onSave')
            } catch(err) {
              alert(err);
              this.dialogStatus = 'WAITING';
            }
            
        }
    },
    data: () => ({
      dialog: false,
      isCreate: false,
      dialogStatus: 'WAITING',
      extension: {},
      extensionFile: []
    }),
}
</script>
<style>
.grey {
  margin: 0.1em 1em;
  color: #999;
}
</style>