<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <div v-if="!articles.length" v-show="!loading">内容为空</div>
    <article-item v-for="a in articles" :key="a.id" v-bind="a"></article-item>
  </scroll-page>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
import ScrollPage from "@/components/scrollpage";
import { getArticles } from "@/api/article";
import axios from "axios";

export default {
  name: "ArticleScrollPage",
  props: {
    offset: {
      type: Number,
      default: 100
    },
    page: {
      type: Object,
      default() {
        return {};
      }
    },
    query: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    query: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage.pageNumber = 1;
        this.getArticles(this.query);
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage = this.page;
        this.getArticles();
      },
      deep: true
    }
  },
  created() {
    if (
      this.query.keyword == "" &&
      this.query.categoryId == "" &&
      this.query.authorId == ""
    ) {
      // alert('ceshi')
      // alert(this.page)
      // console.log(this.page);
      this.getCollection();
    } else {
      this.getArticles();
      this.$store.state.log = this.query.log;
    }
  },
  data() {
    return {
      loading: false,
      noData: false,
      innerPage: {
        pageSize: 5,
        pageNumber: 1,
        name: "a.createDate",
        sort: "desc"
      },
      articles: [],
      contentShow: false
    };
  },
  methods: {
    load() {
      if (
        this.query.keyword == "" &&
        this.query.categoryId == "" &&
        this.query.authorId == ""
      ) {
        this.getCollection();
      } else {
        this.getArticles();
      }
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    getArticles() {
      let that = this;
      that.loading = true;

      getArticles(that.query, that.innerPage)
        .then(data => {
          let newArticles = data.data;
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1;
            that.articles = that.articles.concat(newArticles);
          } else {
            that.noData = true;
          }
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          that.loading = false;
        });
    },
    getCollection() {
      let that = this;
      that.loading = true;
      axios
        .get("articles/listCollection", {
          params: {
            name: that.innerPage.name,
            pageNumber: that.innerPage.pageNumber,
            pageSize: that.innerPage.pageSize,
            sort: that.innerPage.sort,
            userId: this.$store.state.userid
          }
        })
        .then(res => {
          let newArticles = res.data.data;
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1;
            that.articles = that.articles.concat(newArticles);
          } else {
            that.noData = true;
          }
        })
        .catch(err => {
          that.$message({
            showClose: true,
            message: "连接错误",
            type: "warning"
          });
        })
        .finally(() => {
          that.loading = false;
        });
    }
  },
  components: {
    "article-item": ArticleItem,
    "scroll-page": ScrollPage
  }
};
</script>

<style scoped>
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;
}
</style>
