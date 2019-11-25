<template>
  <popup v-model="show_" style="border-radius:2px;" :lock-scroll="false" get-container="body">
    <div class="popUp">
      <div class="popUp-content">
        <div class="popUp-header">
          <v-title class="popUp-title" style="flex:1" :title="title" :type="type" v-if="title"></v-title>
          <img v-if="closeShow" :src="require('_img/close.png')" @click="close" />
        </div>
        <div class="popUp-body" v-if="render">
          <render :renderFun="render" :options="options"></render>
        </div>
      </div>
      <div class="popUp-footer" v-if="showBut">
        <span class="popUp-footer-cancel" @click="close">{{cancelText}}</span>
        <span class="popUp-footer-ok" @click="ok">{{okText}}</span>
      </div>
    </div>
  </popup>
</template>

<script>
import render from "./render.js";
import store from "@/store";
import title from "./title.vue";
export default {
  name: "popUp",
  components: {
    render,
    vTitle: title
  },
  props: {
    // 类别
    type: {
      type: String,
      default: "success"
    },
    // 是否显示标题
    title: {
      type: String,
      default: ""
    },
    // render函数
    render: {
      type: Function
    },
    // 传给render的参数
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    showBut: {
      type: Boolean,
      default: true
    },
    closeShow: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    okText: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      show_: false
    };
  },
  mounted() {
    store.commit("addHashChange", {
      key: "prop",
      fun: this.close
    });
  },
  methods: {
    // 显示
    show() {
      this.show_ = true;
    },
    // 关闭页面
    close() {
      this.show_ = false;
      this.$emit("cancel");
      if (this.onClose) {
        this.onClose();
      }
    },
    // 确定
    ok() {
      this.show_ = false;
      this.$emit("ok");
      if (this.onOk) {
        this.onOk();
      }
    }
  },
  destroyed() {
    store.commit("deleteHashChange", "prop");
  }
};
</script>

<style lang="scss" scoped>
.popUp {
  width: 334px;
  background: #fff;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-content {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    img {
      width: 16px;
      height: 16px;
    }
  }
  &-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border-top: 1px solid #e8e8e8;
    &-cancel {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      height: 44px;
      line-height: 44px;
      text-align: center;
      border-right: 1px solid #e8e8e8;
    }
    &-ok {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: $color-blue;
    }
  }
  &-body {
    padding: 1px;
  }
  &-but {
    width: 136px;
  }
}
</style>
