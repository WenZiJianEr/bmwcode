<template>
  <div>
    <div style="width: 80vw; margin: 10px auto">
      <el-page-header :icon="ArrowLeft" @back="onBack">
        <template #content>
          <span class="text-large font-600 mr-3"> 商品详情 </span>
        </template>
      </el-page-header>
    </div>
    <div class="box">
      <div class="left"><img :src="List.picurl" alt="" /></div>
      <div class="right">
        <div class="title">{{ List.title }}</div>
        <div class="Productdetails">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分：<span>{{
            List.points
          }}</span>
        </div>
        <div class="Productdetails">
          商品编号：<span>{{ List.points }}</span>
        </div>
        <div class="Productdetails" style="margin-bottom: 30px">
          商品类别：<span>{{ List.points }}</span>
        </div>
        <el-input-number
          v-model="num"
          :min="1"
          :max="10"
          style="margin-right: 30px"
        />
        <el-button plain @click="dialogFormVisible2" type="warning">
          积分兑换
        </el-button>
        <el-dialog v-model="dialogFormVisible" title="积分兑换" width="500">
          <el-form :model="form">
            <div style="font-weight: bold; font-size: 18px; margin-bottom: 8px">
              收货地址
            </div>
            <el-radio-group
              v-model="List.acquiesce"
              size="large"
              style="margin-bottom: 8px"
              v-for="item in List.label"
              @click="(event) => handleclick(item, event)"
            >
              <el-radio-button :label="item.data" :value="item.value" />
              <!-- <el-radio-button
                label="李四 15335554445"
                value="李四 15335554445"
              /> -->
            </el-radio-group>
          </el-form>
          <div style="font-weight: bold; font-size: 18px; margin-bottom: 8px">
            商品详情
          </div>
          <div style="display: flex">
            <div style="width: 100px; height: 100px">
              <img
                :src="List.picurl"
                alt=""
                style="width: 100%; height: 100%"
              />
            </div>
            <div style="margin-left: 20px">
              <div class="down">{{ List.title }}</div>
              <div class="down">
                需要积分：<span style="color: #ff9046">{{ Needpoints }}</span>
              </div>
              <div>
                我的积分：<span style="color: #ff9046">{{
                  List.needpoints
                }}</span>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button
                v-model="form"
                type="warning"
                @click="dialogFormVisible1"
                style="width: 100px"
              >
                提交
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
    <div class="box" style="margin-top: 30px">
      <el-descriptions class="margin-top" title="商品详情" :column="3" border>
        <el-descriptions-item v-for="item in List.detailsList">
          <template #label>
            <div class="cell-item">
              {{ item.label }}
            </div>
          </template>
          {{ item.detail }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()

const num = ref(1)
const Needpoints = ref()
const handleChange = (value) => {
  console.log(value, num.value)
}
const clickedValue = ref(1)
const dialogFormVisible = ref(false)
const handleclick = (item, event) => {
  clickedValue.value = item.value
  // console.log(item.value)
}
const dialogFormVisible1 = () => {
  // dialogFormVisible.value = false
  // console.log(dialogFormVisible.value)
  // 调用方法获取接口文件().then(res=>{进行数据赋值，回调函数关闭窗口，跳转页面})
  ElMessage({
    message: '提交成功',
    type: 'success'
  })
  // console.log(clickedValue.value)

  const form = ref({})
  router.push('/myexchange')

  // setInterval(function () {
  //   router.push('/myexchange')
  // },2500)
}

const dialogFormVisible2 = () => {
  dialogFormVisible.value = true
  Needpoints.value = parseInt(List.value.points) * parseInt(num.value)
}

const onBack = () => {
  console.log(123)
  router.push('/')
}

// const detailsList = ref()

const List = ref({
  title: '玻璃茶壶泡茶',
  points: '900',
  picurl: '',
  id: '2',
  picurl:
    'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
  hot: false,
  new: true,
  needpoints: 1801,
  acquiesce: 1,
  detailsList: [
    {
      label: '商品名称',
      detail: '养生壶'
    },
    {
      label: '商品功率',
      detail: '2000w'
    },
    {
      label: '商品价格',
      detail: '299元'
    },
    {
      label: '商品尺寸',
      detail: '20*15*15'
    },
    {
      label: '发货地址',
      detail: '北京顺义区'
    }
  ],
  label: [
    {
      data: '李四 15335554445',
      value: 1
    },
    {
      data: '张三 撒法发',
      value: 2
    }
  ]
})

const form = reactive({
  // name: 1,
  // title: '玻璃茶壶泡茶',
  // points: '900',
  // picurl: '',
  // id: '2',
  // picurl:
  //   'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
  // hot: false,
  // new: true,
  // needpoints: 1801
})
</script>

<style scoped>
body {
  background-color: #f3f6f8;
}
.box {
  width: 80vw;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
}
.left {
  width: 30vw;
  height: 30vw;
}
.left img {
  width: 100%;
  height: 100%;
}
.right {
  margin-left: 50px;
  padding-top: 20px;
  flex: 1;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}
.Productdetails {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ffa84e;
  padding-left: 50px;
}
.Productdetails span {
  margin-left: 20px;
}
.down {
  margin-bottom: 10px;
}
</style>
