<template>
    <Dialog
      ref="dialog"
      :width=480
    >
        <template #title>
            如何向扩展商店添加扩展？
        </template>
        <span>请加入ClipCC官方交流群（加群链接在编辑器关于内），联系群内管理添加</span>
    </Dialog>
</template>
<script>
import { useI18n } from "vue-i18n"
import Dialog from "./Dialog.vue"

export default {
    name: 'request-extension-dialog',
    expose: ['openDialog'],
    components: {
      Dialog
    },
    data () {
      return {
        dialog: false,
        errorDetail: ''
      }
    },
    setup() {
        const { locale, t } = useI18n()
        return { locale, t }
    },
    methods: {
        openDialog () {
            this.$refs.dialog.openDialog();
        }
    }
}
</script>
<style scoped>
p {
    font-size: 1rem;
    line-height: 1.5em;
    margin: 16px;
}
</style>