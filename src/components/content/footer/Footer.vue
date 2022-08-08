<template>
  <div id="footer">
    <div
      class="foot-item"
      v-for="(item, index) in footList"
      :key="index"
      :class="index === currentIndx ? 'active' : ''"
      @click="handleToPath(index)"
    >
      <span :class="item.icon"></span>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footList: [
        {
          path: '/takeout',
          icon: 'iconfont icon-elemo',
          value: '外卖'
        },

        {
          path: '/search',
          icon: 'iconfont icon-dingdan',
          value: '搜索'
        },
        {
          path: '/order',
          icon: 'iconfont icon-zhinanzhen',
          value: '订单'
        },
        {
          path: '/profile',
          icon: 'iconfont icon-my',
          value: '我的'
        }
      ],
      currentIndx: 0
    }
  },
  methods: {
    handleToPath(index) {
      const { path } = this.footList[index]
      this.currentIndx = index
      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/style/mixin';
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  @include wh(100vw, 45px);
  border-top: 1px solid $bc;
  z-index: 100;
  background-color: #fff;
  display: flex;
  .foot-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .active {
    color: #3190e8;
  }
}
</style>
