<template>
    <menu-bar v-model='searchData' />
    <!-- <v-alert type="warning" v-if="!opener">{{ t('notopener') }}</v-alert> -->
    <div class="container">
        <h1 v-if="loadingStatus === 'LOADING'">{{ t('loading') }}</h1>
        <h1 v-else-if="loadingStatus === 'ERROR'">{{ t('loadfail') }}</h1>
        <div class="grid">
            <extension-card v-for="item in getSearchExtension()" :key="item.id" :extension="item" />
        </div>
    </div>
</template>

<script>
import ExtensionCard from "../components/ExtensionCard.vue"
import MenuBar from "../components/MenuBar.vue"
import Dialog from '../components/Dialog.vue'
import qs from 'query-string';
import { useI18n } from "vue-i18n"

export default {
    name: 'home',
    components: {
        ExtensionCard,
        MenuBar,
        Dialog
    },
    setup() {
        const { t } = useI18n()
        return { t }
    },
    mounted() {
        document.title = this.t('title')
        const search = qs.parse(location.search)
        const isCommunity = search.community == '1';
        const isDesktop = search.desktop == '1';
        const isDownload = !window.opener
        fetch(`api/getExtension${isCommunity ? '?community=true' : isDesktop ? '?desktop=true' : isDownload ? '?showHidden=true' : ''}`)
            .then(response => response.json())
            .then(data => {
                this.extension = data;
                this.loadingStatus = 'LOADED';
            })
            .catch(err => {
                this.loadingStatus = 'ERROR';
            })
    },
    methods: {
        getSearchExtension() {
            return this.extension.filter((val) => {
                console.log(val.name.indexOf(this.searchData))
                console.log(val.name)
                if (val.name.toLowerCase().indexOf(this.searchData) > -1) {
                    return val
                }
            })
        }
    },
    data: () => ({
        opener: window.opener,
        loadingStatus: 'LOADING',
        searchData: '',
        extension: []
    }),
}
</script>

<style>
body {
    background-color: rgb(242, 242, 242);
}
</style>
<style scoped>

.grid {
    display: grid;
    gap: 0.6rem;
    grid-template-columns: repeat(2,1fr);
}
@media (min-width: 742px) {
    .grid {
        grid-template-columns: repeat(3,1fr);
    }
}
@media (min-width: 990px) {
    .grid {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>

