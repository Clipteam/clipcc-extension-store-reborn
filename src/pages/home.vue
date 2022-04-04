<template>
    <menu-bar />
    <!-- <v-alert type="warning" v-if="!opener">{{ t('notopener') }}</v-alert> -->
    <div class="container">
        <h1 v-if="loadingStatus === 'LOADING'">{{ t('loading') }}</h1>
        <h1 v-else-if="loadingStatus === 'ERROR'">{{ t('loadfail') }}</h1>
        <div class="grid">
            <extension-card v-for="item in extension" :key="item.id" :extension="item" />
        </div>
    </div>
</template>

<script>
import ExtensionCard from "../components/ExtensionCard.vue"
import MenuBar from "../components/MenuBar.vue"
import Dialog from '../components/Dialog.vue'
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
        opener: window.opener,
        loadingStatus: 'LOADING',
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

