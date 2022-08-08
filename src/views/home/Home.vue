<template>
  <div id="home">
    <Header>
      <span slot="logo" class="iconfont icon-elemo"></span>
    </Header>
    <div class="home-nav">
      <div class="nav-tip">
        <span>当前定位城市:{{ guessCity }}</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <div class="nav-select">
        <span class="arrow-right iconfont icon-right"></span>
      </div>
    </div>
    <home-city title="热门城市" :citylist="hotcity" :isHot="true"></home-city>

    <div v-for="(value, key, index) in sortGroupCity" :key="key">
      <home-city :citylist="value" :index="index" :title="key"></home-city>
    </div>
  </div>
</template>

<script>
import { cityGuess, hotcity, groupcity } from '../../service/home'

import HomeCity from '../../components/content/home-city/HomeCity.vue'
export default {
  components: { HomeCity },
  data() {
    return {
      guessCity: '',
      guessCityid: 0,
      hotcity: [],
      groupcity: {}
    }
  },
  mounted() {
    this.$store.state.isFooter = false
    // 获取当前城市
    cityGuess().then((res) => {
      console.log('cityGuess', res)
      this.guessCity = res.name
      this.guessCityid = res.id
    })
    // 获取热门城市
    hotcity().then((res) => {
      console.log('hotcity', res)
      this.hotcity = res
    })
    // 获取所有城市
    groupcity().then((res) => {
      console.log('groupcity', res)
      this.groupcity = res
    })
  },
  computed: {
    // 获取排序之后的城市
    sortGroupCity() {
      let sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] =
            this.groupcity[String.fromCharCode(i)]
        }
      }
      return sortobj
    }
  },
  // 方法一:在离开该组件时，设置组件内导航守卫
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用——可以访问组件实例 `this`
    if (to.path === 'home') {
      next()
    } else {
      this.$store.state.isFooter = true
      next()
    }
  },
  // 方法二: 保存组件状态，采用keep-alive————在derectivated中调用
  derectivated() {
    console.log('我离开home了')
  }
}
</script>

<style scoped lang="scss">
#home {
  margin-top: 45px;
  width: 100vw;
  color: #333;
  .home-nav {
    background-color: #fff;
    font-size: 14px;
    .nav-tip {
      height: 35px;
      display: flex;
      padding: 0 5px;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid #ccc;
      padding-bottom: 3px;
    }
    .nav-select {
      line-height: 35px;
      height: 35px;
      display: flex;
      justify-content: flex-end;
      border-bottom: 1px solid #ccc;
      .arrow-right {
        font-size: 20px;
        margin-right: 7px;
      }
    }
  }
}
</style>
