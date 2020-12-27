<template>
  <div class="home_container">
     <el-button @click="loginOut">退出</el-button>
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
      window.sessionStorage.clear();

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
   height: 100%;
}
</style>
