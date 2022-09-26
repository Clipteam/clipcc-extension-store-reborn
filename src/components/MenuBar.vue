<template>
  <div class="header">
        <div class="title">
          <img src="../../public/favicon.ico" class="logo" />
          {{t('title')}}
        </div>
          <span class="button" @click="$refs.dialog.openDialog()">{{t('add-extension')}}</span>
        <search v-model='search'/>
  </div>
  <request-extension-dialog ref='dialog'/>
</template>


<script>
import { useI18n } from "vue-i18n"
import Search from "./Search.vue"
import RequestExtensionDialog from "./RequestExtensionDialog.vue";

export default {
    name: "menu-bar",
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data: () => ({
      search: ''
    }),
    setup() {
        const { locale, t } = useI18n();
        return { locale, t };
    },
    watch: {
        search(val, oldval) {
          if (val !== oldval) {
            this.$emit('update:modelValue', val)
          }
        }
    },
    components: {
      Search,
      RequestExtensionDialog
    }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 1000;
  align-items: center;
  font-weight: normal;
  position: fixed;
  font-size: 1rem;
  color: hsla(0, 100%, 100%, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  height: 3.525rem;
  padding: 1rem;
  width: 100%;
  user-select: none;
  background: linear-gradient(35deg, rgb(53, 129, 234), #479cff);;
}
.title {
  .logo {
    position: relative;
    width: 30px;
    height: 30px;
    margin-right: .5rem;
  }
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    user-select: none;
    letter-spacing: 0.4px;
    cursor: default;
}
.left {
  display: flex;
}
.button {
    cursor: pointer;
    padding: 0.425rem 1rem;
    margin-right: 1rem;
    background: rgb(53, 129, 234);
    border-radius: 1.375rem;
    color: hsla(0, 100%, 100%, 1);
    height: 2.22rem;
}

@media (max-width: 510px) {
    .button {
        display: none;
    }
}
</style>