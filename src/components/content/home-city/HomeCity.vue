<template>
  <div id="home-city">
    <div class="title">
      {{ title }}
      <span v-if="index === 0">(按字母排序)</span>
    </div>
    <div class="city-list">
      <div
        v-for="item in citylist"
        :key="item.id"
        class="city-item"
        :class="isHot ? 'active' : ''"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHot: {
      type: Boolean,
      default: false
    },
    citylist: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
#home-city {
  width: 100vw;
  background-color: #fff;
  margin-top: 20px;
  .title {
    font-weight: 600;
    color: #3190e8;
    height: 24px;
    margin-left: 10px;
  }
  .active {
    color: #3190e8;
  }
  .city-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #ccc;
    .city-item {
      font-size: 14px;
      width: 25%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:nth-child(1n) {
        border-right: 1px solid #ccc;
      }
      &:nth-child(2n) {
        border-right: 1px solid #ccc;
      }
      &:nth-child(3n) {
        border-right: 1px solid #ccc;
      }
    }
  }
}
</style>
