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
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF">
            <el-submenu v-for="item in menuList" :key="item.id" :index="item.id.toString()">
              <template slot="title">
                <i class="icon iconfont" :class="iconObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item v-for="sub in item.children" :key="sub.id" :index="sub.id.toString()">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ sub.authName }}</span>
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
    return {
      menuList: [],
      iconObj: {
        125: 'icon-baocun',
        103: 'icon-cuotiji',
        101: 'icon-chenggong',
        102: 'icon-dengluzhanghao',
        145: 'icon-bianji'
      }
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();

      this.$router.push('/login');
    },
    async getMenuList() {
      const { data: rs } = await this.$http.get('menus');

      if (rs.meta.status !== 200) return this.$msg.error(rs.meta.msg);
      console.log(rs);
      this.menuList = rs.data;
    }
  }
};
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
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 4px;
  }
}
</style>
