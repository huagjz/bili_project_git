<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary" @click="addDialogVisible = true">添加用户</el-button></el-col>
      </el-row>

      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoleFn(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页的内容 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username"><el-input v-model="addForm.username"></el-input></el-form-item>
        <el-form-item label="密码" prop="password"><el-input v-model="addForm.password" type="password"></el-input></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="addForm.email"></el-input></el-form-item>
        <el-form-item label="手机" prop="mobile"><el-input v-model="addForm.mobile"></el-input></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
      <!-- 编辑用户信息 -->
      <el-form :model="editForm" :rules="editFormrules" ref="aditFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username"><el-input v-model="editForm.username" disabled></el-input></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="editForm.email"></el-input></el-form-item>
        <el-form-item label="手机" prop="mobile"><el-input v-model="editForm.mobile"></el-input></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="setRoleDialog" width="50%" @close="setRoleDialogClosed">
      <!-- 分配角色信息 -->
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新的角色：
          <el-select v-model="selectRoleId" filterable allow-create default-first-option placeholder="请选择文章标签">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    var checkMobile = (rule, value, callback) => {
      var reg = /^1[34578]\d{9}$/

      if (reg.test(value)) {
        return callback()
      }

      callback(new Error('请输入合法的手机号'))
    }
    return {
      selectRoleId: '',
      roleList: [],
      userInfo: {},
      setRoleDialog: false,
      editForm: {},
      editDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editFormrules: {
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
      },
      addFormrules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
      },
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 分配角色
    async saveRoleInfo () {
      if (!this.selectRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectRoleId })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message.success('更新角色成功！')
      this.getUserList()
      this.setRoleDialog = false
    },
    // 分配角色对话框关闭事件
    setRoleDialogClosed () {
      this.selectRoleId = ''
      this.userInfo = {}
    },
    async setRoleFn(userInfo) {
      console.log(userInfo)
      this.userInfo = userInfo
      // 获取所有的角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)

      this.roleList = res.data
      this.setRoleDialog = true
    },
    async delUser(item) {
      const rsConfirm = await this.$confirm('确定要删除此用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(rsConfirm)
      if (rsConfirm === 'cancel') return
      const { data: res } = await this.$http.delete('users/' + item.id)
      if (res.meta.status !== 200) return this.$message.error(res.mata.msg)
      this.$message.success('删除成功')
      this.getUserList()
    },
    editUser() {
      this.$refs.aditFormRef.validate(async valid => {
        if (!valid) return
        // 编辑用户的接口
        const { data: rs } = await this.$http.put('users/' + this.editForm.id, { email: this.editForm.email, mobile: this.editForm.mobile })
        console.log(rs)
        if (rs.meta.status !== 200) return this.$message.error(rs.meta.msg)
        this.$message.success('修改成功')
        this.editDialogVisible = false
        this.getUserList()
      })
    },
    async showEditDialog(item) {
      console.log(item)
      const { data: rs } = await this.$http.get('users/' + item.id)

      if (rs.meta.status !== 200) return this.$message.error(rs.mata.msg)
      console.log(rs)
      this.editForm = rs.data
      this.editDialogVisible = true
    },
    editDialogClose() {
      this.$refs.aditFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return

        // 添加用户的接口
        const { data: rs } = await this.$http.post('users', this.addForm)
        console.log(rs)
        if (rs.meta.status !== 201) return this.$message.error(rs.meta.msg)

        this.$message.success('添加用户成功')
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 用户状态
    async userStateChange(userInfo) {
      console.log(userInfo)
      const { data: rs } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)

      if (rs.meta.status !== 200) {
        this.$message.error(rs.meta.msg)
        userInfo.mg_state = false
        return
      }
      this.$message.success('更新用户状态成功！')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      console.log()
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    // 获取数据列表
    async getUserList() {
      const { data: rs } = await this.$http.get('users', {
        params: this.queryInfo
      })

      console.log(rs)
      if (rs.meta.status !== 200) return this.$message.error(rs.meta.msg)
      this.userList = rs.data.users
      this.total = rs.data.total
    }
  }
}
</script>

<style></style>
