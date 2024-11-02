<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      background-color="#0099cc"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      style="position: relative"
    >
      <el-menu-item v-for="item in menuList" :index="item.index">{{
        item.name
      }}</el-menu-item>
      <div
        style="
          position: absolute;
          right: 0;
          height: 100%;
          display: flex;
          align-items: center;
        "
      >
        <span
          @click="handleclickto"
          style="
            margin-right: 20px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
          "
          >我的兑换</span
        >
        <div
          class="yeslogin"
          v-if="islogin"
          style="display: flex; align-items: center"
        >
          <el-dropdown>
            <span class="el-dropdown-link" style="color: #fff"> 姓名 </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleclick"
                  >订单中心</el-dropdown-item
                >
                <el-dropdown-item @click="dialogFormVisible=true">账号设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-avatar :size="40" :src="imageUrl" style="margin: 0 20px" />
        </div>
        <div class="nologin" v-if="!islogin">12</div>
      </div>
    </el-menu>
    <div class="message">
      <el-dialog v-model="dialogFormVisible" title="个人信息维护" width="500">
        <el-form :model="form">
          <el-form-item label="手机号：" >
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户名：" >
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户照：" >
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确认修改
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue'
import HomeList from '@/components/Home/List.vue'

import { ElUpload } from 'element-plus'
// import { Getlist } from '@/api/index.js' // 导入API组件
import { useRouter } from 'vue-router'
const router = useRouter()
const islogin = ref(true)
const activeIndex2 = ref('1')
const imageUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const emit = defineEmits(['updateData'])
const handleSelect = (index) => {
  //  dataFromParent.value = index
  emit('updateData', index)
}

const handleclick = () => {
  router.push('/center')
}
const handleclickto = () => {
  router.push('/myexchange')
}
const Pagedata = {
  //分页数据
  page: 1,
  pageSize: 10
}

// Getlist2401(Pagedata).then((res) => {
//     // tableData.value = res.data.data.list //表格数据
//     // totalNum.value = res.data.data.totalNum // 分页
//     // console.log(res)
//   })

const menuList = ref([
  //导航数据
  {
    name: '全部',
    index: '1'
  },
  {
    name: '最新',
    index: '2'
  },
  {
    name: '最热',
    index: '3'
  }
])

const dialogFormVisible = ref(false)
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
// import  { UploadProps } from 'element-plus'

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
