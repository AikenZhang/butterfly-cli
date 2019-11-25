<template>
  <div class="null">
    <img :src="require('_img/null.png')">
    <span class="null-text">暂无数据</span>
    <span class="null-refresh" @click="refresh">点击刷新</span>
  </div>
</template>

<script>
export default {
  // 空数据页面
  name:'null',
  props:{
    refresh:{
      type:null,
      default:''
    }
  }
}
</script>

<style lang="scss" scoped>
.null{
  position: absolute;
  height:400px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top:50px;
  img{
    width:70%;
  }
  &-text{
    font-size:14px;
    font-weight: 400;
    color:#999;
    padding: 20px;
  }
  &-refresh{
    padding:20px;
    font-size:12px;
    color: $color-blue;
  }
}
</style>
