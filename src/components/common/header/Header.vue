<template>
  <div id="header" :style="{ background: bgcolor }">
    <div class="left" :style="{ width: leftWidth }">
      <slot name="logo"></slot>
      <slot name="search"></slot>
      <slot name="back"></slot>
    </div>
    <div class="center">{{ headTitle }}</div>
    <div class="login" v-if="true">
      <span>登录</span>
      <i>|</i>
      <span>注册</span>
    </div>
    <div class="right" :style="{ width: rightWidth }">
      <slot name="right">
        <!-- <span class="iconfont icon-huiyuanjulebu"></span> -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: '#3190e8'
    },
    leftWidth: {
      type: String,
      default: '40px'
    },
    headTitle: {
      type: String,
      default: ''
    },
    rightWidth: {
      type: String,
      default: '40px'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import 'assets/style/mixin';
#header {
  position: fixed;
  top: 0;
  left: 0;
  @include wh(100vw, 45px);
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  line-height: 45px;

  .left,
  .right {
    height: 45px;
    display: flex;
    justify-content: center;
    .iconfont {
      font-size: 25px;
    }
  }
  .center {
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }

  .login {
    position: absolute;
    right: 10px;
    top: 0;
    height: 45px;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
