<template>
    <div class="search-bar">
        <img src="../assets/search.svg" alt="search" class="icons">
        <input 
            type="text" 
            class="input" 
            :placeholder="t('search')" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"

        />
    </div>
</template>
<script>
import {useI18n} from 'vue-i18n'
export default {
    name: 'search',
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup() {
        const { locale, t } = useI18n();
        return { locale, t };
    },
}
</script>
<style lang="scss" scoped>
.search-bar {
    position: relative;
    background: hsla(0, 100%, 100%, 1);
    border-radius: 10rem;
    user-select: none;
    height: 2rem;
}

.search-bar:focus-within {
    box-shadow: 0 0 0 0.25rem hsl(215deg 100% 65% / 35%);
}
.icons {
    left: 0;
    margin: 0.6rem 0.70rem 0.70rem 1rem;
    position: absolute;
    top: 0;
    height: 1rem;
    width: 1rem;
}
.input {
    padding: 0.255rem 2rem 0.65rem 3rem;
    width: 11.5rem;
    transition: .2s;
    height: 2.5rem;
    background-color: transparent;
    -webkit-appearance: none;
    outline: none;
    border: 0;
    background-color: transparent;
    color: hsla(225, 15%, 40%, 1);
    font-size: 0.75rem;
    letter-spacing: 0.15px;
    cursor: text;
}
.input::placeholder {
   padding: 0 0 0 0.25rem;
}
</style>