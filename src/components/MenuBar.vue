<template>
  <v-app-bar>
        <v-app-bar-title>{{t('title')}}</v-app-bar-title>

        <!-- <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template> -->
  </v-app-bar>
</template>


<script>
import { useI18n } from "vue-i18n"

export default {
  name: 'menu-bar',
  setup() {
    const { locale, t } = useI18n()
    return { locale, t }
  },
}
</script>
