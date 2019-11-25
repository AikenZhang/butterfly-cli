<template>
  <div class="propTitle">
    <img :src="imgUrl" />
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "propTitle",
  props: {
    type: {
      type: String,
      default: "success"
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    imgUrl() {
      switch (this.type) {
        case "success":
          return require("_img/ok.png");
          break;
        case "warning":
          return require("_img/hint.png");
          break;
        case "confirm":
          return require("_img/question.png");
          break;
        default:
          return require("_img/ok.png");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.propTitle {
  display: flex;
  padding: 0 32px;
  font-size: 16px;
  justify-content:center;
  align-items:center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}
</style>
