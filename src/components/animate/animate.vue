<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  // 动画组件
  name:'transition'
}
</script>

<style>
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
