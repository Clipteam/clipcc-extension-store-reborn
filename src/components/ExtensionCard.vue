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
                <v-btn variant="outlined" v-else>{{t('install')}}</v-btn>
            </div>
        </div>
    </v-card>
</template>
<script>
import { useI18n } from "vue-i18n"
export default {
    name: 'extension-card',
    props: {
        extension: Object
    },
    data: () => ({
        cardStatus: 'LOADING'
    }),
    mounted: () => {
        // await this.fetchInstalledExtension()
    },
    setup() {
        const { locale, t } = useI18n()
        return { locale, t }
    },
    methods: {
        fetchInstalledExtension () {
            return new Promise((resolve, reject) => {
                const extensionChannel = BroadcastChannel('extension')
                extensionChannel.postMessage({action: 'get'})
                extensionChannel.addEventListener('message', event => {
                    console.log(event);
                })
            })
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
        font-size: 0.35em;
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