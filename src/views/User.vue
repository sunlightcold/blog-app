<template>
  <div class="user-wrap">
    <div class="list-wrap">
      <ul class="list-ul">
        <li :class="{active: tipNum == 20}" @click="getPerArt(20)">修改个人资料</li>
        <li :class="{active: tipNum == 17}" @click="getPerArt(17)">个人文章</li>
        <li :class="{active: tipNum == 22}" @click="getPerArt(22)">个人日志</li>
      </ul>
    </div>
    <div class="content-wrap" v-show="tipNum == 20">
      <ul class="content-ul">
        <li>
          <label class="input-label">昵称</label>
          <input type="text" v-model="nickname">
        </li>
        <li>
          <label class="input-label">GitHub</label>
          <input type="text" v-model="github">
        </li>
        <li>
          <label class="input-label">QQ</label>
          <input type="text" v-model="qq">
        </li>
        <li>
          <label class="input-label">邮箱</label>
          <input type="text" v-model="email">
        </li>
        <li>
          <label class="input-label">职业</label>
          <input type="text" v-model="job">
        </li>
        <li>
          <label class="input-label">所在地</label>
          <input type="text" v-model="address">
        </li>
        <li>
          <label class="input-label per-name">个性签名</label>
          <textarea class="per-name-content" v-model="signature"></textarea>
        </li>
      </ul>
      <el-button type="success" class="storage" @click="saveUserData">保存</el-button>
    </div>
    <div class="user-article" v-show="tipNum == 17 || tipNum == 22">
      <el-main class="me-articles" width="66%">
        <!-- middle-articlelist -->
        <article-scroll-page
          :query="{categoryId: '', keyword: '', authorId: this.$store.state.id, log: this.$store.state.log}"
          style="width: 1000px"
        ></article-scroll-page>
      </el-main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArticleScrollPage from "@/views/common/ArticleScrollPage";

export default {
  components: {
    ArticleScrollPage
  },
  data() {
    return {
      nickname: "",
      github: "",
      qq: "",
      email: "",
      job: "",
      address: "",
      signature: "",
      tipNum: 20
    };
  },
  mounted() {
    (this.nickname = this.$store.state.nickname),
      (this.github = this.$store.state.github),
      (this.qq = this.$store.state.qq),
      (this.email = this.$store.state.email),
      (this.job = this.$store.state.job),
      (this.address = this.$store.state.address),
      (this.signature = this.$store.state.signature);
  },
  methods: {
    saveUserData() {
      let that = this;
      //   let send = {
      //     id: parseInt(this.$store.state.userid),
      //     nickname: that.nickname,
      //     github: that.github,
      //     qq: that.qq,
      //     email: that.email,
      //     job: that.job,
      //     address: that.address,
      //     signature: that.signature
      //   };
      //   console.log(JSON.stringify(send))
      axios
        .post("/updateUser", {
          id: parseInt(this.$store.state.userid),
          nickname: that.nickname,
          github: that.github,
          qq: that.qq,
          email: that.email,
          job: that.job,
          address: that.address,
          signature: that.signature
        })
        .then(res => {
          let userdata = res.data.data.user;
          console.log(userdata);
          localStorage.setItem("nickname", userdata.nickname);
          localStorage.setItem("github", userdata.github);
          localStorage.setItem("qq", userdata.qq);
          localStorage.setItem("email", userdata.email);
          localStorage.setItem("job", userdata.job);
          localStorage.setItem("address", userdata.address);
          localStorage.setItem("signature", userdata.signature);

          that.$message({
            message: "信息修改成功",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPerArt(num) {
      this.tipNum = num;
      if(num == 17) {
         this.$store.state.log = ''
      } else if(num ==22) {
          this.$store.state.log = 1
      }

    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
.user-wrap {
  width: 1203px;
  height: 500px;
  margin: 0 auto;
  margin-top: 100px;
}

.list-wrap {
  width: 15%;
  float: left;
  box-sizing: border-box;
}

.list-ul > li {
  height: 30px;
  padding: 10px 10px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 600;
  background-color: #fff;
  text-align: center;
}

.list-ul > li:hover {
  background-color: #5fb878;
  color: #fff;
  cursor: pointer;
}

.list-ul > .active {
  background-color: #5fb878;
  color: #fff;
}

.content-wrap {
  width: 80%;
  background-color: #fff;
  float: right;
  box-sizing: border-box;
}

.content-ul > li {
  padding: 10px 0px;
}
.input-label {
  width: 80px;
  background-color: #fff;
  display: inline-block;
  text-align: center;
}

.content-ul > li > input {
  height: 20px;
  width: 300px;
  border-radius: 5%;
  padding: 0 10px;
}

.per-name {
  float: left;
}

.per-name-content {
  padding: 8px;
  font-size: 16px;
  width: 560px;
  height: 200px;
}
.storage {
  float: right;
  margin-right: 31%;
}
</style>


