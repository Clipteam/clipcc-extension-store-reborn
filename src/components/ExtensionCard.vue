<template>
    <v-card class="card">
        <div class="content">
            <div class="left">
                <v-card-title>{{ extension.name }}</v-card-title>
                <div class="text">
                    <span>{{t('author')}} : {{ extension.author }}</span>
                    <span>{{t('version')}} : {{ extension.version }}</span>
                </div>
            </div>
            <div class="right">
                <v-btn variant="outlined" v-if="cardStatus === 'LOADING'" disabled>{{t('loading')}}</v-btn>
                <v-btn variant="outlined" v-else-if="cardStatus === 'INSTALLED'" disabled>{{t('installed')}}</v-btn>
                <v-btn variant="outlined" v-else-if="cardStatus === 'INSTALLING'" disabled>{{t('installing')}}</v-btn>
                <v-btn variant="outlined" @click="handleInstall()" v-else>{{t('install')}}</v-btn>
            </div>
        </div>
    </v-card>
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
        this.extensionChannel = new BroadcastChannel('extension');
        this.extensionChannel.postMessage({action: 'get'})
        this.extensionChannel.addEventListener('message', this.fetchInstalledExtension)
    },
    unmounted(){
        this.extensionChannel.removeEventListener('message', this.fetchInstalledExtension)
    },
    setup() {
        const { locale, t } = useI18n()
        return { locale, t }
    },
    methods: {
        fetchInstalledExtension (event) {
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
        }
    }
}
</script>
<style scoped lang="scss">
.card {
    padding: 0.45em 0;
    margin-bottom: 1em;
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