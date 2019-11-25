<template>
  <div class="power">
    <img :src="require('_img/lock.png')">
    <span class="power-text">无访问权限</span>
  </div>
</template>

<script>
export default {
  // 无权限页面
  name:'power'
}
</script>

<style lang="scss" scoped>
.power{
  height:400px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    width:70%;
  }
  &-text{
    font-size:14px;
    font-weight: 400;
    color:#999;
    padding: 20px;
  }
}
</style>
