<template>
  <div v-title :data-title="title">
    <el-container class="me-area">
      <el-main class="me-main">
        <el-main class="me-articles">
          <!-- middle-articlelist -->
          <article-scroll-page
            :query="{categoryId: '', keyword: '', authorId: ''}"
            style="width: 1000px"
          ></article-scroll-page>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ArticleScrollPage from "@/views/common/ArticleScrollPage";
export default {
  name: "Log",
  components: {
    ArticleScrollPage
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return "日志 - Young Blog";
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 1200px;
}

.me-main {
  overflow: hidden;
}

.me-log-box {
  margin-left: 30%;
  margin-top: 20px;
}
</style>
