<template>
    <Teleport to="body">
        <div class="dialog" @click.self="onClose()" v-if="show">
            <div class="dialog-content" :style="{width: width+'px'}">
                <div class="box">
                    <div class="dialog-header">
                        <div class="header-item title"><slot name="title"></slot></div>
                        <div class="header-item close">
                            <div class="close-button" @click="onClose()">
                                <img src="../assets/icon-add.svg" class="close-icon"/>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script>
export default {
    name: 'Dialog',
    emits: ['onClose'],
    expose: ['openDialog', 'closeDialog'],
    props: {
        width: {
            type: Number,
            default: 500
        }
    },
    data: () => ({
        show: false
    }),
    methods: {
        log(log) {
            console.log(log)
        },
        openDialog() {
            this.show = true
        },
        closeDialog() {
            this.show = false
        },
        onClose() {
            this.show = false
            this.$emit('onClose')
        }
    }
}
</script>

<style scoped lang="scss">
.dialog {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1510;
    background-color: hsla(215, 100%, 65%, 0.5);
}
.dialog-content {
    margin: auto auto;
    outline: none;
    border: 4px solid hsla(0, 100%, 100%, 0.25);
    padding: 0;
    border-radius: 0.75rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: hsla(225, 15%, 40%, 1);
    overflow: hidden;
}
.dialog-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    height: 3.125rem;
    box-sizing: border-box;
    width: 100%;
    background: linear-gradient(35deg, rgb(53, 129, 234), #479cff);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1rem;
    font-weight: normal;
}
.dialog-body {
    background: hsla(0, 100%, 100%, 1);
    padding: 1.5rem 2.25rem;
}
.header-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    text-decoration: none;
    color: hsla(0, 100%, 100%, 1);
    -webkit-user-select: none;
    user-select: none;
}
.box {
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    display: flex;
}
.title {
    margin: 0 -20rem 0 0;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: center;
    -webkit-user-select: none;
    user-select: none;
    letter-spacing: 0.4px;
    cursor: default;
}
.close {
    flex-basis: 20rem;
    justify-content: flex-end;
    z-index: 1;
}
.close-button {
    .close-icon {
        width: 0.75rem;
        height: 0.75rem;
        position: relative;
        margin: 0.25rem;
        user-select: none;
        transform-origin: 50%;
        transform: rotate(45deg);
    }
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: hsla(0, 0%, 0%, 0.15);
    border-radius: 50%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    transition: all 0.15s ease-out;
    outline: none;
    width: 1.75rem;
    height: 1.75rem;
    box-shadow: 0 0 0 2px hsl(0deg 0% 0% / 15%);
}
.close-button:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 0 0 4px hsl(0deg 0% 0% / 15%);
}
</style>