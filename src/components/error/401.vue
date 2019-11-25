<template>
  <div class="error-401">
    <power></power>
  </div>
</template>

<script>
import power from './power.vue'
export default {
  name:'error401',
  components:{
    power
  }
}
</script>

<style lang="scss" scoped>
.error-401{
  width:100%;
  height:100%;
}
</style>
