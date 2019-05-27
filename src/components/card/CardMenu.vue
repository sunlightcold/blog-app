<template>
  <div class="aside">
    <span>技术频道</span>
    <ul ref="rMenu">
      <li @click="setcategoryId(1)" :class="{active: id == 1}">前端</li>
      <li @click="setcategoryId(2)" :class="{active: id == 2}">后端</li>
      <li @click="setcategoryId(3)" :class="{active: id == 3}">小程序</li>
      <li @click="setcategoryId(4)" :class="{active: id == 4}">Android</li>
      <li @click="setcategoryId(5)" :class="{active: id == 5}">ios</li>
      <li @click="setcategoryId(6)" :class="{active: id == 6}">游戏开发</li>
      <li @click="setcategoryId(8)" :class="{active: id == 8}">编程语言</li>
      <li @click="setcategoryId(9)" :class="{active: id == 9}">大数据</li>
      <li @click="setcategoryId(10)" :class="{active: id == 10}">人工智能</li>
      <li @click="setcategoryId(11)" :class="{active: id == 11}">系统安全</li>
      <li @click="setcategoryId(12)" :class="{active: id == 12}">数据库</li>
      <li @click="setcategoryId(13)" :class="{active: id == 13}">运维</li>
    </ul>
    <span>吐槽频道</span>
    <ul>
      <li @click="setcategoryId(14)">生活</li>
      <li @click="setcategoryId(15)">工作</li>
      <li @click="setcategoryId(16)">滑稽</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0
    };
  },
  methods: {
    setcategoryId(id) {
      this.$store.commit("setCategoryId", id);
      this.$store.commit('setKeyword', '')
      this.id = id
    }
  }
};
</script>

<style scoped>
.aside {
  width: 5.25%;
  position: fixed;
  background-color: #fff;
  /* top: px; */
  z-index: 10000;
}
ul {
  width: 100%;
  padding: 0;
  list-style: none;
  background-color: #fff;
}
span {
  font-size: 15px;
  height: 30px;
  line-height: 30px;
  padding: 10px 0px;
  text-align: center;
  font-weight: 900;
  display: block;
  background-color: #000;
  color: #fff;
  border-radius: 5%;
  /* border: 1px solid #ccc; */
}
li {
  font-size: 15px;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  padding: 10px 0px;
  text-align: center;
  font-weight: 500;
}
li:hover {
  font-size: 15px;
  padding-bottom: 10px;
  background-color: rgba(103, 194, 58, 0.8);
  color: #fff;
}

.active {
  font-size: 15px;
  padding-bottom: 10px;
  background-color: rgba(103, 194, 58, 0.8);
  color: #fff;
}
</style>
