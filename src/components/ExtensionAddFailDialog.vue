<template>
    <Dialog
      ref="dialog"
      :width=390
    >
    <template #title>
      {{ t('extension-install-fail-title') }}
    </template>
    <h2>{{ t('extension-install-fail', {extension: extensionId}) }}</h2>
        <p>{{ t('error-detail') }} : {{ errorDetail }}</p>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{ t('OK') }}
          </v-btn>
        </v-card-actions> -->
    </Dialog>
</template>
<script>
import { useI18n } from "vue-i18n"
import Dialog from "./Dialog.vue"

export default {
    name: 'extension-add-fail-dialog',
    expose: ['openDialog'],
    components: {
      Dialog
    },
    data () {
      return {
        errorDetail: ''
      }
    },
    setup() {
        const { locale, t } = useI18n()
        return { locale, t }
    },
    methods: {
        openDialog (extensionId, detail) {
            this.$refs.dialog.openDialog();
            this.extensionId = extensionId;
            this.errorDetail = detail;
        }
    }
}
</script>

<style scoped>
h2, p {
  text-align: center;
}
</style>