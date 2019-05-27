<template>
  <div class="me-view-body" v-title :data-title="title">
    <el-container class="me-view-container">
      <!--<el-aside class="me-area">-->
      <!--<ul class="me-operation-list">-->
      <!--<li class="me-operation-item">-->
      <!--<el-button type="primary" icon="el-icon-edit"></el-button>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</el-aside>-->
      <el-main>
        <div class="me-view-card">
          <h1 class="me-view-title">{{article.title}}</h1>
          <div class="me-view-author">
            <a class>
              <img class="me-view-picture" :src="article.author.avatar">
            </a>
            <div class="me-view-info">
              <span>{{article.author.nickname}}</span>
              <div class="me-view-meta">
                <span>{{article.createDate | format}}</span>
                <span v-if="!this.$store.state.log">阅读 {{article.viewCounts}}</span>
                <span v-if="!this.$store.state.log">评论 {{article.commentCounts}}</span>
              </div>
            </div>
            <span
              class="me-pull-right user-start"
              v-if="!this.$store.state.log"
              @click="artCollect"
            >
              <i class="el-icon-star-on" :class="{collected: ifCollection && this.$store.state.token}"></i>
              &nbsp;收藏
            </span>
            <el-button
              v-if="this.article.author.id == this.$store.state.id"
              @click="editArticle()"
              style="position: absolute;left: 60%;"
              size="mini"
              round
              icon="el-icon-edit"
            >编辑</el-button>
          </div>
          <div class="me-view-content">
            <markdown-editor :editor="article.editor"></markdown-editor>
          </div>

          <div class="me-view-end" v-if="!this.$store.state.log">
            <el-alert title="文章End..." type="success" center :closable="false"></el-alert>
          </div>

          <div class="me-view-tag" v-if="!this.$store.state.log">
            标签：
            <!--<el-tag v-for="t in article.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagname}}</el-tag>-->
            <el-button
              @click="tagOrCategory('tag', t.id)"
              size="mini"
              type="primary"
              v-for="t in article.tags"
              :key="t.id"
              round
              plain
            >{{t.tagname}}</el-button>
          </div>

          <div class="me-view-tag" v-if="!this.$store.state.log">
            文章分类：
            <!--<span style="font-weight: 600">{{article.category.categoryname}}</span>-->
            <el-button
              @click="tagOrCategory('category', article.category.id)"
              size="mini"
              type="primary"
              round
              plain
            >{{article.category.categoryname}}</el-button>
          </div>

          <div class="me-view-comment" v-if="!this.$store.state.log">
            <div class="me-view-comment-write">
              <el-row :gutter="20">
                <el-col :span="2">
                  <a class>
                    <img class="me-view-picture" :src="avatar">
                  </a>
                </el-col>
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="你的评论..."
                    class="me-view-comment-text"
                    v-model="comment.content"
                    resize="none"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="2" :offset="22">
                  <el-button type="text" @click="publishComment()">评论</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="me-view-comment-title">
              <span>{{article.commentCounts}} 条评论</span>
            </div>

            <commment-item
              v-for="(c,index) in comments"
              :comment="c"
              :articleId="article.id"
              :index="index"
              :rootCommentCounts="comments.length"
              @commentCountsIncrement="commentCountsIncrement"
              :key="c.id"
            ></commment-item>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import CommmentItem from "@/components/comment/CommentItem";
import { viewArticle } from "@/api/article";
import { getCommentsByArticle, publishComment } from "@/api/comment";

import default_avatar from "@/assets/img/default_avatar.png";
import axios from "axios";

export default {
  name: "BlogView",
  created() {
    this.getArticle();
    this.testCollection()
  },
  watch: {
    $route: "getArticle"
  },
  data() {
    return {
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        author: {},
        tags: [],
        category: {},
        createDate: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview"
        }
      },
      comments: [],
      comment: {
        article: {},
        content: ""
      },
      ifCollection: false
    };
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatar;

      if (avatar.length > 0) {
        return avatar;
      }
      return default_avatar;
    },
    title() {
      return `${this.article.title} - 文章 - Young Blog`;
    }
  },
  methods: {
    tagOrCategory(type, id) {
      this.$router.push({ path: `/${type}/${id}` });
    },
    editArticle() {
      if (!this.$store.state.log) {
        this.$router.push({ path: `/write/${this.article.id}` });
      } else {
        this.$router.push({ path: `/writelog/${this.article.id}` });
      }
    },
    getArticle() {
      let that = this;
      viewArticle(that.$route.params.id)
        .then(data => {
          Object.assign(that.article, data.data);
          that.article.editor.value = data.data.body.content;

          that.getCommentsByArticle();
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
    },
    publishComment() {
      let that = this;
      if (!that.comment.content) {
        return;
      }
      that.comment.article.id = that.article.id;

      publishComment(that.comment)
        .then(data => {
          that.$message({
            type: "success",
            message: "评论成功",
            showClose: true
          });
          that.comments.unshift(data.data);
          that.commentCountsIncrement();
          that.comment.content = "";
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论失败",
              showClose: true
            });
          }
        });
    },
    getCommentsByArticle() {
      let that = this;
      getCommentsByArticle(that.article.id)
        .then(data => {
          that.comments = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论加载失败",
              showClose: true
            });
          }
        });
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1;
    },
    artCollect() {
      // alert('ceshi')
      if (!this.$store.state.token) {
        this.$message.error("未登录");
      } else {
        let that = this;
        axios
          .get("/articles/changeCollection", {
            params: {
              userId: that.$store.state.userid,
              articleId: that.$route.params.id,
              flag: '1'
            }
          })
          .then(res => {
            console.log(res.data);
            let status = res.data.code;
            // 判断收藏状态;
            if (status == 11) {
              that.ifCollection = true;
              that.$message({
                showClose: true,
                message: "收藏成功",
                type: "success"
              });
            } else {
              that.ifCollection = false;
              that.$message({
                showClose: true,
                message: "取消收藏",
                type: "warning"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "连接出错",
              type: "error"
            });
          });
      }
    },
    testCollection() {
      let that = this;
      axios
        .get("/articles/changeCollection", {
          params: {
            userId: that.$store.state.userid,
            articleId: that.$route.params.id,
            flag: '0'
          }
        })
        .then(res => {
          let status = res.data.code;
          // 判断收藏状态;
          if (status == 111) {
            that.ifCollection = true;
          } else {
            that.ifCollection = false;
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "连接出错",
            type: "error"
          });
        });
    }
  },
  components: {
    "markdown-editor": MarkdownEditor,
    CommmentItem
  },
  //组件内的守卫 调整body的背景色
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#fff";
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#f5f5f5";
    next();
  }
};
</script>

<style>
.user-start {
  cursor: pointer;
  font-size: 15px;
  color: #444;
}

.user-start > i {
  font-size: 18px;
}

.collected {
  color: gold;
}

.me-view-body {
  margin: 100px auto 140px;
}

.me-view-container {
  /* width: 700px; */
  width: 900px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 0px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}
</style>
