<!--
 * @Author: your name
 * @Date: 2019-09-26 22:04:13
 * @LastEditTime: 2019-11-25 11:40:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\App.vue
 -->
<template>
  <div style="height:100%;">
    <keep-alive :include="'layout'">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "Index",
  mounted() {
    window.addEventListener("popstate", () => {
      if (this.$store.state.modalArray.length > 0) {
        this.$store.commit("deletePropArry");
      }
    });
    // 拦截全局input输入框输入非法字符和表情
    document.oninput = ev => {
      setTimeout(function() {
        ev.target.value = ev.target.value.replace(
          /[^a-zA-Z0-9\u4E00-\u9FA5\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5'\s*!@#$%^&*()~`?"':;：;'.,》《+-——]/g,
          ""
        );
        // 触发vue 的双向绑定  要不input 里面的特殊字符没有了 但是对应的 model 其实还有
        ev.target.dispatchEvent(new CustomEvent("input")); // added this
      }, 0);
    };
  },
  methods: {
  }
};
</script>
<style lang='scss'>
body,
html {
  background: #fafafa;
  height: 100%;
  overflow: hidden;
  font-family: "Helvetica Neue", -apple-system, BlinkMacSystemFont, PingFang SC,
    Roboto, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, Myriad Pro,
    Hiragino Sans GB, Lucida Grande, sans-serifsl;
}
</style>
