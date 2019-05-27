<template>
  <el-card>
    <div class="login-ok" v-if="this.$store.state.token">
      <h1 class="me-author-name">{{ this.$store.state.nickname }}</h1>
      <div class="me-author-description">
        <span>
          <i class="el-icon-location-outline"></i> &nbsp;{{ this.$store.state.address }}
        </span>
        <span>
          <i class="me-icon-job"></i> &nbsp;{{ this.$store.state.job }}
        </span>
      </div>
      <div class="me-author-tool">
        <i @click="showTool(qq)" :title="qq.title" class="me-icon-QQ"></i>
        <i @click="showTool(github)" :title="github.title" class="me-icon-github"></i>
      </div>
    </div>
    <div class="login-no" v-if="!this.$store.state.token">
      <h1 class="me-author-name">未登录</h1>
      <div class="me-author-description"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CardMe",
  data() {
    return {
      qq: { title: "QQ", message: this.$store.state.qq },
      github: {
        title: "github",
        message: this.$store.state.github
      }
    };
  },
  methods: {
    showTool(tool) {
      this.$message({
        duration: 0,
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: "<strong>" + tool.message + "</strong>"
      });
    }
  }
};
</script>

<style scoped>
.login-ok {
  height: 200px;
}
.login-no {
  height: 200px;
}
.me-author-name {
  text-align: center;
  font-size: 30px;
  border-bottom: 1px solid #5fb878;
}

.me-author-description {
  padding: 8px 0;
}

.me-icon-job {
  padding-left: 16px;
}

.me-author-tool {
  text-align: center;
  padding-top: 10px;
}

.me-author-tool i {
  cursor: pointer;
  padding: 4px 10px;
  font-size: 30px;
}
</style>
