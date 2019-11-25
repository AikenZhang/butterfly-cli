<template>
  <div class="loading">
    <div class="loading-content">
      <img :src="require('_img/loading.gif')"/>
      <slot></slot>
    </div>
    <div class="loading-mark"></div>
  </div>
</template>

<script>
export default {
  // loading组件
  name:'loading'
}
</script>

<style scoped lang="scss">
.loading{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 4000;
  &-content{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scaleY(-50%);
    z-index: 4002;
    img{
      width:15%;
    }
  }
  &-mark{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 4001;
    background: #fff;
    opacity: 0.6;
  }
}
</style>
