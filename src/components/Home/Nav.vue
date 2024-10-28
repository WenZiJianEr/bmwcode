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
    >
      <el-menu-item v-for="item in menuList" :index="item.index">{{
        item.name
      }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Getlist2401 } from '@/api/index.js' // 导入API组件
import { useRouter } from 'vue-router'
const router = useRouter()
const activeIndex2 = ref('1')
const handleSelect = (index) => {
  // 导航点击事件
  // console.log(index)
  if (index == 1) {
    // console.log(123);
  } else if (index == 2) {
    // console.log(2);
    router.push('/myexchange')
  } else {
    // console.log(3);
    router.push('/Center')
  }
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
    name: '我的兑换',
    index: '2'
  },
  {
    name: '个人中心',
    index: '3'
  }
])
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
