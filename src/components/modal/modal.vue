<template>
  <transition name="fade">
    <div :class="modalClass" ref="modal" v-if="show_" :style="`z-index:${zIndex};`">
      <better-scroll
        :autoInit="false"
        :pullingDown="refresh"
        :pullingUp="pullingUp"
        style="flex:1;"
        ref="bScroll"
        :preventDefault="this.preventDefault"
        :class="{'modal-init':!isInit}"
      >
        <render :render_fun="render" :options="options"></render>
      </better-scroll>
      <div class="modal-button" v-if="buttonShow">
        <span class="modal-button-left" @click="cancel">{{cancelText}}</span>
        <span class="modal-button-right" @click="ok">{{okText}}</span>
      </div>
      <div v-show="floatBut" class="modal-floatBut">
        <span @click="floatButClick">{{floatButText}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import render from "./render.js";
import betterScroll from "../betterScroll";
import animate from "../animate";
export default {
  name: "modal",
  components: {
    render,
    betterScroll
  },
  props: {
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
    buttonShow: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    okText: {
      type: String,
      default: "确认"
    },
    // 是否阻止默认事件
    preventDefault: {
      type: Boolean,
      default: true
    },
    isInit: {
      type: Boolean,
      default: true
    },
    // 是否显示浮动按钮
    floatBut: {
      type: Boolean,
      default: false
    },
    // 浮动按钮回调
    floatButFun: {
      type: Function,
      default: null
    },
    floatButText: {
      type: String,
      default: "确认"
    }
  },
  beforeMount() {
    let length = document.querySelectorAll(".modal").length;
    this.zIndex = 10 + 10 * length;
    this.$on("refresh", () => {
      this.refresh();
    });
  },
  mounted() {
    let me = this;
    let bodyHeight = document.body.clientHeight
    window.addEventListener("resize", () => {
      let body_h = me.$refs.modal.scrollHeight;
      let client_h = me.$refs.modal.clientHeight
      if (body_h < bodyHeight) {
        me.modalClass = {
          'modal': true,
          'modal-flex':false
        };
      } else {
        me.modalClass = {
          'modal': true,
          "modal-flex": true
        }
      }
    })
  },
  data() {
    return {
      show_: false,
      zIndex: 10,
      refresh: "",
      pullingUp: "",
      butShow: true,
      modalClass: {
        modal: true,
        "modal-flex": true
      }
    };
  },
  methods: {
    // 显示
    show() {
      this.show_ = true;
      if (!this.isInit) {
        return;
      }
      this.$nextTick(() => {
        let children = this.$children[0].$children[0].$children[0] || "";
        this.refresh = children && children.refresh ? children.refresh : false;
        this.pullingUp =
          children && children.pullingUp ? children.pullingUp : false;
        setTimeout(() => {
          if (this.$children[0]) {
            this.$children[0]._initScroll();
          }
        });
      });
    },
    // 关闭页面
    close() {
      this.show_ = false;
    },
    cancel() {
      if (this.$refs.bScroll.$children[0].cancel &&  this.$refs.bScroll.$children[0].cancel()) {
        return;
      }
       this.$emit("close");
      window.history.go(-1);
     
    },
    ok() {
      if (
        this.$refs.bScroll.$children[0].ok &&
        this.$refs.bScroll.$children[0].ok()
      ) {
        return;
      }
      this.$emit("ok");
      window.history.go(-1);
    },
    floatButClick() {
      if (this.floatButFun) {
        this.floatButFun();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  //z-index:9;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fcfcfc;
  &-button {
    display: flex;
    font-size: 16px;
    box-shadow: 0px -1px 10px 0px rgba(209, 211, 223, 0.6);
    span {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      height: 44px;
      line-height: 44px;
      text-align: center;
    }
    &-left {
      background: #fff;
      color: $color-blue;
    }
    &-right {
      background: $color-blue;
      color: #fff;
    }
  }
  &-init {
    overflow-y: scroll;
  }
  &-floatBut {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    span {
      width: 187px;
      height: 44px;
      line-height: 44px;
      background: $color-blue;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
  }
  &-flex {
    display: flex;
    flex-direction: column;
  }
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(30px);
  opacity: 0;
}
</style>
