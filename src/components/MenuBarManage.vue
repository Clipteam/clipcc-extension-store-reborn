<template>
  <div class="header">
        <div class="title">
          <img src="/favicon.ico" class="logo" />
           ClipCC扩展商店管理面板
        </div>
  </div>
</template>


<script>
import { useI18n } from "vue-i18n"

export default {
    name: "menu-bar-manage",
    setup() {
        const { locale, t } = useI18n();
        return { locale, t };
    },
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
  background: linear-gradient(5deg, rgb(53, 129, 234), #479cff);
}
.title {
  .logo {
    position: relative;
    width: 25px;
    height: 25px;
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
</style>