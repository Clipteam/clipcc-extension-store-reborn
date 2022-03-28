<template>
    <v-dialog
      v-model="dialog"
      width="600"
    >
    <div class="text-center">
      <v-card width="500">
        <v-card-title class="text-h5">
          {{ t('extension-install-fail', {extension: extensionId}) }}
        </v-card-title>
        <v-card-text>{{ t('error-detail') }} : {{ errorDetail }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{ t('OK') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      </div>
    </v-dialog>
</template>
<script>
import { useI18n } from "vue-i18n"

export default {
    name: 'extension-add-fail-dialog',
    expose: ['openDialog'],
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
        openDialog (extensionId, detail) {
            this.dialog = true;
            this.extensionId = extensionId;
            this.errorDetail = detail;
        }
    }
}
</script>