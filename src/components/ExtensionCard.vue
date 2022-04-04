<template>
    <div class="card">
        <div class="image">
            <img 
                v-if="!!extension.image"
                :src="'extension/image/' + extension.image"
            />
            <img v-else src="../assets/default-extension-image.jpg" />
        </div>
        <div class="extension-info">
            <span>{{ extension.name }}
            <div class="action">
                <button v-if="cardStatus === 'LOADING'" disabled>{{t('loading')}}</button>
                <button v-else-if="cardStatus === 'INSTALLED'" disabled>{{t('installed')}}</button>
                <button v-else-if="cardStatus === 'INSTALLING'" disabled>{{t('installing')}}</button>
                <button v-else-if="cardStatus === 'DOWNLOAD'" @click="handleDownload()">{{t('download')}}</button>
                <button @click="handleInstall()" v-else>{{t('install')}}</button>
            </div>
            </span>
            <span>{{ extension.description ? extension.description : t('nodescription') }}</span>
        </div>
        <div class="extension-metadata">
            <div class="item"><div>{{ t('version') }}</div><div class="detail">{{ extension.version }}</div></div>
            <div class="item"><div>{{ t('author') }}</div><div class="detail">{{ extension.author }}</div></div>
        </div>
    </div>
    <extension-add-fail-dialog ref='dialog' />
</template>
<script>
import { useI18n } from "vue-i18n"
import ExtensionAddFailDialog from "./ExtensionAddFailDialog.vue"

export default {
    name: 'extension-card',
    props: {
        extension: Object
    },
    components: {
        ExtensionAddFailDialog
    },
    data: () => ({
        cardStatus: 'LOADING'
    }),
    mounted() {
        if (!window.opener) {
            this.cardStatus = 'DOWNLOAD';
            return;
        };
        this.extensionChannel = new BroadcastChannel('extension');
        this.extensionChannel.addEventListener('message', this.fetchInstalledExtension)
        this.extensionChannel.postMessage({action: 'get'})
    },
    unmounted(){
        if (!window.opener) return
        this.extensionChannel.removeEventListener('message', this.fetchInstalledExtension)
    },
    setup() {
        const { locale, t } = useI18n()
        return { locale, t }
    },
    methods: {
        fetchInstalledExtension (event) {
            console.log('[BroadcastChannel] event(%s) %o', event.data.action, event.data);
            if (event.data.action === 'tell') {
                if (event.data.data.includes(this.extension.extensionId)) {
                    this.cardStatus = 'INSTALLED'
                } else {
                    this.cardStatus = 'NOTINSTALL'
                }
            } else if (event.data.action === 'addSuccess' && event.data.extensionId === this.extension.extensionId) {
                this.cardStatus = 'INSTALLED'
            } else if (event.data.action === 'addFail' && event.data.extensionId === this.extension.extensionId) {
                this.$refs.dialog.openDialog(this.extension.name, event.data.error)
                this.cardStatus = 'NOTINSTALL'
            }
        },
        handleInstall() {
            this.cardStatus = 'INSTALLING'
            this.extensionChannel.postMessage({
                action: 'add',
                extension: this.extension.extensionId,
                download: `${location.origin}${location.pathname}extension/${this.extension.filename}`
            });
        },
        handleDownload() {
            const url = document.createElement('a')
            url.download = this.extension.filename
            url.href = `${location.origin}${location.pathname}extension/${this.extension.filename}`
            url.click();
        }
    }
}
</script>
<style scoped lang="scss">
.card {
    transition: 0.25s ease-out;
    min-width: 0;
    background: white;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0.5rem;
    padding: 0;
    border-style: solid;
    border-color: hsla(0, 0%, 0%, 0.15);
}
.card:hover {
    border-color: rgb(53, 129, 234);
}
.image {
    position: relative;
    overflow: hidden;
    img {
        width: 100%;
        display: block;
    }
}
.action {
    button {
        word-break: keep-all;
        cursor: pointer;
        border-radius: 7px;
        border-width: 1px;
        border-color: hsla(0, 0%, 0%, 0.15);
        padding: .13rem .20rem;
    }
}
.extension-info {
    span:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        flex-direction: row;
    }
    span:nth-child(2) {
        overflow: hidden;
        position: relative;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; 
        font-weight: normal;
        line-height: 1.375rem;
        padding-top: 0.3125rem;
        padding-bottom: 0.25rem;
    }
    text-align: left;
    padding: 10px;
    padding-left: 1.25rem;
}
.extension-metadata {
    .item {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .detail {
        height: 100%;
        padding-top: 0.1rem;
        font-weight: bold;
    }
    text-align: left;
    width: 100%;
    padding: 0 1.25rem 1rem 1.25rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
    color: hsla(225, 15%, 40%, 1);
    opacity: 0.75;
}
.content {
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.text {
    display: flex;
    flex-direction: column;
    padding: 0.5em 0;
    span {
        font-size: 0.65rem;
        color: rgba(0, 0, 0, 0.6);
    }
}
.left {
    display: flex;
}
.right {
    display: flex;
    margin-right: 1em;
}
</style>