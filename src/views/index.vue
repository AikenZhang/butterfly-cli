<!--
 * @Author: your name
 * @Date: 2019-11-25 11:40:46
 * @LastEditTime: 2019-11-25 13:46:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\views\index.vue
 -->
<template>
  <div class="butterfly">
    <img :src="require('_img/butterfly.png')" />
    <span>

    </span>
    欢迎使用 butterfly 移动端脚手架</div>
</template>
<script>
export default {
  name: 'index'
}
</script>
<style lang="scss" scoped>
.butterfly{
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size:14px;
  img {
    width:150px;
    height:150px;
  }
}
</style>