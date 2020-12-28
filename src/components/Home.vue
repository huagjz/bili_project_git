<template>
  <div class="home_container">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="图标" />
          <span>电商后台管理系统</span>
        </div>
        <el-button @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-4-1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear()

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      img {
        height: 80%;
        border-radius: 50%;
      }
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
