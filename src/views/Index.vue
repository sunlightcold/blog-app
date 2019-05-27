<template>
  <keep-alive>
    <div v-title data-title="Young Blog 分享&学习">
      <el-container el-col-16>
        <el-aside width="8%" style="margin-right: 20px">
          <card-menu></card-menu>
        </el-aside>

        <el-main class="me-articles" width="66%">
          <!-- middle-articlelist -->
          <article-scroll-page
            :query="{categoryId: this.$store.state.categoryId, keyword: this.$store.state.keyword}"
            style="width: 100%; min-width: 730px;"
          ></article-scroll-page>
        </el-main>

        <el-aside width="26%">
          <card-me class="me-area"></card-me>
          <card-tag :tags="hotTags"></card-tag>

          <card-article cardHeader="最热文章" :articles="hotArticles"></card-article>

          <card-archive cardHeader="文章归档" :archives="archives"></card-archive>

          <card-article cardHeader="最新文章" :articles="newArticles"></card-article>
        </el-aside>
      </el-container>
    </div>
  </keep-alive>
</template>

<script>
import CardMe from "@/components/card/CardMe";
import CardArticle from "@/components/card/CardArticle";
import CardArchive from "@/components/card/CardArchive";
import CardTag from "@/components/card/CardTag";
import ArticleScrollPage from "@/views/common/ArticleScrollPage";
import CardMenu from "@/components/card/CardMenu";

import { getArticles, getHotArtices, getNewArtices } from "@/api/article";
import { getHotTags } from "@/api/tag";
import { listArchives } from "@/api/article";

export default {
  name: "Index",
  created() {
    this.getHotArtices();
    this.getNewArtices();
    this.getHotTags();
    this.listArchives();
  },
  data() {
    return {
      hotTags: [],
      hotArticles: [],
      newArticles: [],
      archives: []
    };
  },
  methods: {
    getHotArtices() {
      let that = this;
      getHotArtices()
        .then(data => {
          that.hotArticles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热文章加载失败!",
              showClose: true
            });
          }
        });
    },
    getNewArtices() {
      let that = this;
      getNewArtices()
        .then(data => {
          that.newArticles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最新文章加载失败!",
              showClose: true
            });
          }
        });
    },
    getHotTags() {
      let that = this;
      getHotTags()
        .then(data => {
          that.hotTags = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热标签加载失败!",
              showClose: true
            });
          }
        });
    },
    listArchives() {
      listArchives()
        .then(data => {
          this.archives = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章归档加载失败!",
              showClose: true
            });
          }
        });
    }
  },
  components: {
    "card-me": CardMe,
    "card-article": CardArticle,
    "card-tag": CardTag,
    ArticleScrollPage,
    CardArchive,
    CardMenu
  }
};
</script>

<style scoped>
.el-card__body {
  padding: 0px;
}
.el-container {
  margin: 0 auto;
  padding: 0px 350px;
}

.el-aside {
  margin-left: 20px;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 20px;
}
</style>
