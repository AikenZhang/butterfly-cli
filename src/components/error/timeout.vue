<template>
  <div class="error">
    <img :src="require('_img/timeout.png')"/>
    <span class="error-text">网络连接失败</span>
    <span class="error-refresh" @click="refresh">点击刷新</span>
  </div>  
</template>

<script>
export default {
  name:'error-timeout',
  computed:{
    query () {
      return this.$route.query
    }
  },
  methods:{
    refresh () {
      this.$router.back()
      setTimeout(() =>{
        window.location.reload()
      },100)
    }
  }
}
</script>

<style lang='scss' scoped>
.error{
  width:100%;
  position: absolute;
  left:0;
  right:0;
  top:0;
  background: #fcfcfc;
  bottom:0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  z-index: 999999;
  padding-top: 100px;
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
