<template>
    <Dialog
      ref="dialog"
    >
    <template #title>
        {{isCreate ? '添加': '编辑'}}扩展
    </template>
        <p class="grey">Tips: 正常情况下会从扩展文件内自动获取，无需手动输入</p>
        <form @submit.prevent="saveExtension()">
                <label for="extensionid">扩展ID</label>
                <input
                    type="text"
                    placeholder="扩展ID"
                    name="extensionid"
                    label="扩展ID"
                    autocomplete="off"
                    v-model="extension.extensionId"
                    required
                />
                <label for="extensionname">扩展名</label>
                <input
                    type="text"
                    name="extensionname"
                    placeholder="扩展名..."
                    autocomplete="off"
                    v-model="extension.name"
                    required
                />
                 <label for="extensiondescription">扩展说明</label>
                <input
                    type="text"
                    name="extensiondescription"
                    placeholder="扩展说明..."
                    autocomplete="off"
                    v-model="extension.description"
                    required
                />
                <label for="extensionname">作者</label>
                <input
                    type="text"
                    label="作者"
                    placeholder="作者..."
                    autocomplete="off"
                    variant="underlined"
                    v-model="extension.author"
                    required
                >
                <label for="version">版本</label>
                <input
                    type="text"
                    name="version"
                    placeholder="版本..."
                    autocomplete="off"
                    variant="underlined"
                    v-model="extension.version"
                    required
                >
                <label for="settings">扩展设置</label>
                <div name="settings" class="settings">
                    <div>
                        <input
                            id="community"
                            type="checkbox"
                            value="community"
                            autocomplete="off"
                            v-model="extension.community"
                        >
                        <label for="community">社区版可用</label>
                    </div>
                    <div>
                        <input
                            id="desktop"
                            type="checkbox"
                            value="desktop"
                            autocomplete="off"
                            v-model="extension.desktop"
                        >
                        <label for="desktop">仅桌面版</label>
                    </div>
                    <div>
                        <input
                            id="hidden"
                            type="checkbox"
                            value="hidden"
                            autocomplete="off"
                            variant="underlined"
                            v-model="extension.hidden"
                        >
                        <label for="hidden">隐藏</label>
                    </div>
                </div>
                <label for="file">文件</label>
                <input
                    variant="underlined"
                    accept=".ccx"
                    type="file"
                    @change="e => readExtension(e)"
                    label="扩展文件"
                />
          <div>
            <button
              color="blue-darken-1"
              type="button"
              @click.prevent="$refs.dialog.closeDialog()"
            >
              关闭
            </button>
            <button
              color="blue-darken-1"
              text
              type="submit"
              :disabled="dialogStatus == 'SUBMITING'"
            >
              保存
            </button>
          </div>
        </form>
    </Dialog>
</template>

<script>
import JSZip from 'jszip';
import Dialog from './Dialog.vue';

export default {
    expose: ["openDialog"],
    emits: ["onSave"],
    name: "extension-edit-dialog",
    methods: {
        openDialog(item, isCreate) {
            this.$refs.dialog.openDialog();
            this.isCreate = isCreate;
            this.extension = {};
            this.extensionFile = [];
            this.icon = null;
            if (!isCreate) {
                this.extension = item;
            }
        },
        async readExtension(event) {
            this.extensionFile = event.target.files;
            console.log(this.extensionFile);
            if (this.extensionFile.length < 1)
                return;
            try {
                const extensionFile = await this.extensionFile[0].arrayBuffer();
                const zip = await JSZip.loadAsync(extensionFile);
                const info = await zip.file("info.json").async("string");
                const infoJson = JSON.parse(info);
                this.extension.extensionId = infoJson.id;
                this.extension.author = infoJson.author;
                this.extension.version = infoJson.version;
                const iconsPath = infoJson.icon;
                const icon = await zip.file(iconsPath).async("blob");
                this.icon = icon;
            }
            catch (err) {
                console.error(err);
            }
        },
        async saveExtension() {
            this.dialogStatus = "SUBMITING";
            let extension = this.extension;
            if (this.extensionFile[0]) {
                const file = this.extensionFile[0];
                extension = Object.assign(this.extension, {
                    extensionFile: file
                });
            }
            if (this.icon) {
                extension = Object.assign(this.extension, {
                    iconFile: this.icon
                });
            }
            const formData = new FormData();
            for (const key in extension) {
                formData.append(key, extension[key]);
            }
            try {
                const response = await fetch("api/SaveExtension", {
                    method: "post",
                    body: formData
                });
                await response.json();
                this.$refs.dialog.closeDialog();
                this.dialogStatus = "WAITING";
                this.$emit("onSave");
            }
            catch (err) {
                alert(err);
                this.dialogStatus = "WAITING";
            }
        }
    },
    data: () => ({
        dialog: false,
        isCreate: false,
        dialogStatus: "WAITING",
        icon: null,
        extension: {},
        extensionFile: []
    }),
    components: { Dialog }
}
</script>
<style scoped lang="scss">
.grey {
  color: #999;
}
input[type=text], input[type=file] {
  width: 100%;
  border-radius: 0.63rem;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  transition: all .15s;
  border-radius: 10px;
  background-color: #04AA6D;
  color: white;
  padding: 10px 15px;
  margin: 8px 0;
  border: none;
  margin-right: 5px;
  cursor: pointer;
}

.settings {
    display: flex;
    margin: 0.8rem;
    label {
        font-size: 0.3rem;
        color: #999;
        padding: 0 .30rem;
    }
}
</style>