<template>
  <!-- 演示地址 -->
  <div class="dem-add">
    <!-- Search start -->
    <div class="dem-title">
      <p>我的地址</p>
      <el-input
        class="query-input"
        v-model="tableForm.name"
        placeholder="请输入收货人搜索"
        @keyup.enter="handleQueryName"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" circle />
    </div>
    <!-- Search end -->
    <!-- Table start -->
    <div class="bs-page-table">
      <el-table
        :data="tableData"
        ref="multipleTableRef"
        style="max-height: 60vh; overflow: auto"
      >
        <el-table-column prop="name" label="收货人" width="80" />
        <el-table-column prop="phone" label="手机" width="120" />
        <el-table-column prop="district" label="所在地区" width="200" />
        <el-table-column prop="address" label="详细地址" width="200" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              type="danger"
              :icon="Delete"
              @click="handleRowDel(scope.$index)"
              circle
            />
            <el-button
              type="primary"
              :icon="Edit"
              @click="handleEdit(scope.row, scope.$index)"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        v-model="dialogFormVisible"
        :title="dialogType.name === 'add' ? '新增' : '编辑'"
        width="500"
      >
        <el-form :model="tableForm">
          <el-form-item label="收货人" :label-width="80">
            <el-input v-model="tableForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机" :label-width="80">
            <el-input v-model="tableForm.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="所在地区" :label-width="80">
            <el-input v-model="tableForm.district" autocomplete="off" />
          </el-form-item>
          <el-form-item label="详细地址" :label-width="80">
            <el-input v-model="tableForm.address" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false"> 取消 </el-button>
            <el-button type="primary" @click="dialogConfirm"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- Table end -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// import { get, post, del, put } from "../../utils/request";
import { Search } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { Delete } from '@element-plus/icons-vue'
import { Edit } from '@element-plus/icons-vue'

// 演示地址
// 默认对话框关闭状态
const dialogFormVisible = ref(false)
let tableForm = reactive({
  name: '',
  phone: '',
  district: '',
  address: ''
})
// 定义对话框标题
const dialogType = ref({ name: 'add' })
// 定义表单变量
let tableData = ref([
  {
    name: 'Jarry',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  },
  {
    name: 'Tom',
    phone: '13833335555',
    district: '山西省太原市杏花岭区',
    address: '中北大学'
  }
])
//全局保存编辑的行号
const globalIndex = ref(-1)

// 搜索（通过name值查找）//存在bug！！！
const handleQueryName = async () => {
  const result = tableData.value.filter(
    (item: any) => item.name === tableForm.name
  )
  tableData.value = result
}
// 新增
const handleAdd = async () => {
  // 打开新增对话框
  dialogFormVisible.value = true
  dialogType.value.name = 'add'
  // 设置新的空的绑值对象
  tableForm = reactive({ name: '', phone: '', district: '', address: '' })
}
// 删除一条数据(但是现在是删除全部对象)
const handleRowDel = async (index: any) => {
  // 从index位置开始，删除一行即可
  tableData.value.splice(index, 1)
}
// 编辑
const handleEdit = (row: any, index: any) => {
  // Object.assign拷贝赋值到表单
  const newobj = Object.assign({}, row)
  tableForm = reactive(newobj)
  //把当前编辑的行号赋值给全局保存的行号
  globalIndex.value = index
  console.log(globalIndex.value)
  // 打开编辑对话框
  dialogFormVisible.value = true
  dialogType.value.name = 'edit'
}
// 确认
const dialogConfirm = () => {
  // 判断是新增还是编辑
  if (dialogType.value.name === 'edit') {
    tableData.value[globalIndex.value] = tableForm
  } else {
    //新增
    tableData.value.push(tableForm)
  }
  dialogFormVisible.value = false
}
</script>

<style scoped lang="scss">
// 演示地址
.dem-add {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.333);
  box-shadow: 0 8px 16px #0005;
  border-radius: 16px;
  overflow: hidden;
  // 标签
  .dem-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(207, 204, 204, 0.267);
    padding: 0 20px;
    p {
      float: left;
      width: 150px;
      color: #000;
    }
    // 搜索
    ::v-deep .el-input__wrapper {
      border-radius: 100px;
    }
    .query-input {
      width: 240px;
      height: 35px;
      margin: 10px auto;
      margin-left: 330px;
      background-color: transparent;
      transition: 0.2s;
    }
    ::v-deep .el-input__wrapper:hover {
      background-color: #fff8;
      box-shadow: 0 5px 40px #0002;
    }
    // 增加按钮
    .el-button {
      float: left;
      margin-top: 3px;
      margin-left: 10px;
    }
  }
  // 表格
  .bs-page-table {
    .el-table {
      width: 100%;
      border: 1px solid rgb(219, 219, 219);
      padding: 10px;
      .el-table-column {
        border-collapse: collapse;
        text-align: left;
      }
    }
  }
  // 分页
  .demo-pagination-block {
    padding: 9px 20px;
  }
}
</style>
