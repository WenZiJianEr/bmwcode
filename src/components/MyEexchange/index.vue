<template>
  <div>
    <div class="crumbs box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的兑换</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search box">
      <el-form style="display: flex">
        <el-form-item label="商品名称"
          ><el-input style="max-width: 200px; margin-right: 30px"
        /></el-form-item>
        <el-button type="primary" :icon="Search">搜索</el-button>
        <el-button :icon="Refresh">重置</el-button>
      </el-form>
    </div>
    <div class="box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="OrderNum" label="订单编号" width="180" />
        <el-table-column prop="productName" label="商品名称" width="200" />
        <el-table-column prop="points" label="消耗积分" width="180"  />
        <el-table-column prop="time" label="兑换时间" />
      </el-table>
      <div class="example-pagination-block">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="40"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Refresh } from '@element-plus/icons-vue' // 字体图标
import { ref } from 'vue'
const tableData = ref([
  // 表格数据
  {
    time: '2016-05-03 08:14:26',
    OrderNum: '855459112',
    productName:'小熊纳豆米酒酸奶机',
    points: '1800',
    address:''
  },
  {
    time: '2016-05-02 15:55:07',
    OrderNum: '851261115',
    productName:'旅行茶具套装便携式',
    points: '900'
  }
])


// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

</script>

<style scoped>
.box {
  width: 80vw;
  margin: 0 auto;
}
.crumbs {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
