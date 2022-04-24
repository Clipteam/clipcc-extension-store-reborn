<template>
    <Dialog
      ref="dialog"
      :width=480
    >
        <template #title>
            如何向扩展商店添加扩展？
        </template>
        <h3>你可以通过以下几种方式将你的扩展添加至商店</h3>
        <p>1. QQ群内私聊群主添加</p>
        <p>2. 发送邮箱至xxxx@gmail.com</p>
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