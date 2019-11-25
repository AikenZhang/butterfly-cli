<template>
  <div ref="wrapper" class="wrapper">
    <div class="wrapper-content">
      <slot></slot>
      <!-- 底部留白 -->
      <div class="wrapper-bottomContent" v-if="isNull">
        <span>--暂无数据--</span>
      </div>
      <div class="wrapper-loading-bottom" v-if="isPullUp">
        <loading></loading>
      </div>
    </div>
    <div class="wrapper-pulldown" :style="pullDownStyle" v-if="pullDownRefresh && !isPullDown">
      <bubble :y="bubbleY"></bubble>
    </div>
    <div class="wrapper-loading" v-if="isRefresh">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Bubble from "./bubble.vue";
import loading from "./loading.vue";
export default {
  props: {
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullingUp: {
      type: null,
      default: ""
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullingDown: {
      type: null,
      default: ""
    },
    toEnd: {
      type: Number,
      default: 50
    },
    autoInit: {
      type: Boolean,
      default: true
    },
    preventDefault:{
      type:Boolean,
      default:true
    }
  },
  components: {
    Bubble,
    loading
  },
  data() {
    return {
      bubbleY: 0,
      // scroll实例
      scroll: "",
      pullDownStyle: {
        top: "-50px"
      },
      pullDownInitTop: -50,
      isPullDown: false,
      isRefresh: false,
      // 是否在加载
      isPullUp: false,
      //是否加在完毕
      isNull: false
    };
  },
  computed: {
    pullDownRefresh() {
      return this.pullingDown ? { threshold: 60, stop: 50 } : false;
    },
    pullUpLoad() {
      return this.pullingUp ? { threshold: 50 } : false;
    }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    if (this.autoInit) {
      setTimeout(() => {
        this._initScroll();
      }, 100);
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      console.log("init");
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1,
        click: true,
        startY: 0,
        scrollY: true,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        mouseWheel: false,
        bounce: true,
        zoom: false,
        preventDefault: true,
        preventDefaultException:{tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}
      });
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullingUp) {
        this.scroll.on("scrollEnd", pos => {
          if (
            pos.y <= this.scroll.maxScrollY + this.toEnd &&
            !this.isNull &&
            !this.isPullUp
          ) {
            this.isPullUp = true;
            this.pullingUp().then(data => {
              if (!data || data.length === 0) {
                this.isNull = true;
              }
              this.forceUpdate();
            });
          }
        });
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pullingDown) {
        this.scroll.on("scroll", pos => {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        });
        this.scroll.on("pullingDown", () => {
          this.beforePullDown();
          // 执行刷新回调
          this.pullingDown().finally(() => {
            this.forceUpdate();
          });
        });
      }
      this.$emit("init");
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    forceUpdate() {
      this.bubbleY = 0;
      this.isRefresh = false;
      this.scroll.finishPullDown();
      setTimeout(() => {
        this.isPullDown = false;
        this.isPullUp = false;
        this.pullDownStyle = {
          top: "-50px"
        };
        this.refresh();
      }, 400);
    },
    // 执行刷新之前操作
    beforePullDown() {
      this.isPullDown = true;
      this.isRefresh = true;
      this.isNull = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: $edit-color;
  &-content {
    position: relative;
    z-index: 1;
    min-height:100%;
    background: $edit-color;
  }
  &-pulldown {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
  }
  &-loading {
    position: absolute;
    width: 100%;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
  }
  &-bottomContent {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 10px 0;
  }
  &-loading-bottom {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
  }
}
</style>
