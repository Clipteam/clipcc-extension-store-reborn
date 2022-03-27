<template>
    <h1 v-if="loadingStatus === 'LOADING'">{{ t('loading') }}</h1>
    <h1 v-else-if="loadingStatus === 'ERROR'">{{ t('loadfail') }}</h1>
    <extension-card v-for="item in extension" :key="item.id" :extension="item" />
</template>

<script>
import ExtensionCard from "../components/ExtensionCard.vue"
import { useI18n } from "vue-i18n"

export default {
    name: 'home',
    components: {
        ExtensionCard
    },
    setup() {
        const { t } = useI18n()
        return { t }
    },
    mounted() {
        fetch('api/getExtension')
            .then(response => response.json())
            .then(data => {
                this.extension = data;
                this.loadingStatus = 'LOADED';
            })
            .catch(err => {
                this.loadingStatus = 'ERROR';
            })
            
    },
    data: () => ({
        loadingStatus: 'LOADING',
        extension: []
    }),
}
</script>