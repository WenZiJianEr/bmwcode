<template>
  <div>
    <HomeNav @updateData="handleDataFromChild"></HomeNav>
    <div class="cardbox">
      <el-card style="width: 260px; height: 400px" v-for="item in List">
        <img :src="item.picurl" style="width: 100%; height: 280px" />
        <div class="title">{{ item.title }}</div>
        <div class="duihuan">
          <div class="points">
            <el-icon><Coin /></el-icon>&nbsp;{{ item.points }}积分
          </div>
          <el-button type="warning" round @click="handleClick(item)"
            >兑&nbsp;换</el-button
          >
        </div>
        <div class="hot xtcss" v-if="item.hot">最热</div>
        <div class="new xtcss" v-if="item.new">新品</div>
      </el-card>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[8]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="40"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div></div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import HomeNav from '@/components/Home/Nav.vue'
const router = useRouter()
const List1 = ref([
  // 数据列表（请求数据替换）
  {
    title: '小熊纳豆米酒酸奶机',
    points: '900',
    picurl: '',
    id: '1',
    picurl:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    hot: true,
    new: false,
    needpoints: 1800
  },
  {
    title: '玻璃茶壶泡茶',
    points: '900',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: false,
    new: true,
    needpoints: 1801
  },
  {
    title: '旅行茶具套装便携式',
    points: '900',
    picurl: '',
    id: '3',
    picurl:
      'https://img.alicdn.com/imgextra/i2/2850801197/O1CN01BWDrZS1KiGuuhJInM_!!2850801197.jpg',
    hot: false,
    new: false,
    needpoints: 1802
  },
  {
    title: '茶杯茶水分离高档',
    points: '900',
    picurl: '',
    id: '4',
    picurl:
      'https://img.alicdn.com/imgextra/i2/681801211/O1CN015Ac7Wi1KogRcEmgih_!!681801211.jpg',
    hot: false,
    new: false,
    needpoints: 1803
  },
  {
    title: '小熊纳豆米酒酸奶机',
    points: '900',
    picurl: '',
    id: '5',
    picurl:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    hot: false,
    new: false,
    needpoints: 1804
  },
  {
    title: '茶杯茶水分离高档',
    points: '900',
    picurl: '',
    id: '4',
    picurl:
      'https://img.alicdn.com/imgextra/i2/681801211/O1CN015Ac7Wi1KogRcEmgih_!!681801211.jpg',
    hot: false,
    new: false,
    needpoints: 1803
  },
  {
    title: '茶杯茶水分离高档',
    points: '900',
    picurl: '',
    id: '4',
    picurl:
      'https://img.alicdn.com/imgextra/i2/681801211/O1CN015Ac7Wi1KogRcEmgih_!!681801211.jpg',
    hot: true,
    new: false,
    needpoints: 1803
  },
  {
    title: '茶杯茶水分离高档',
    points: '900',
    picurl: '',
    id: '4',
    picurl:
      'https://img.alicdn.com/imgextra/i2/681801211/O1CN015Ac7Wi1KogRcEmgih_!!681801211.jpg',
    hot: false,
    new: true,
    needpoints: 1803
  }
])
const List2 = ref([
  {
    title: '小熊纳豆米酒酸奶机',
    points: '1900',
    picurl: '',
    id: '1',
    picurl:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    hot: true,
    new: false,
    needpoints: 1800
  },
  {
    title: '玻璃茶壶泡茶',
    points: '2900',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: true,
    new: false,
    needpoints: 1801
  },
  {
    title: '旅行茶具套装便携式',
    points: '3900',
    picurl: '',
    id: '3',
    picurl:
      'https://img.alicdn.com/imgextra/i2/2850801197/O1CN01BWDrZS1KiGuuhJInM_!!2850801197.jpg',
    hot: true,
    new: false,
    needpoints: 1802
  }
])
const List3 = ref([
  {
    title: '小熊纳豆米酒酸奶机',
    points: '1900',
    picurl: '',
    id: '1',
    picurl:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    hot: false,
    new: true,
    needpoints: 1800
  },
  {
    title: '玻璃茶壶泡茶',
    points: '2900',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: false,
    new: true,
    needpoints: 1801
  },
  {
    title: '旅行茶具套装便携式',
    points: '3900',
    picurl: '',
    id: '3',
    picurl:
      'https://img.alicdn.com/imgextra/i2/2850801197/O1CN01BWDrZS1KiGuuhJInM_!!2850801197.jpg',
    hot: false,
    new: true,
    needpoints: 1802
  },
  {
    title: '旅行茶具套装便携式',
    points: '3900',
    picurl: '',
    id: '3',
    picurl:
      'https://img.alicdn.com/imgextra/i2/2850801197/O1CN01BWDrZS1KiGuuhJInM_!!2850801197.jpg',
    hot: false,
    new: true,
    needpoints: 1802
  }
])
const List = ref([])

const props = defineProps({
  parentData: String
})

const lshow = ref(1)

const dataFromChild = ref(1)
const handleDataFromChild = (data) => {
  dataFromChild.value = data
  Listshow()
}

const Listshow = () => {
  lshow.value = dataFromChild.value
  if (lshow.value == 1) {
    List.value = List1.value
  } else if (lshow.value == 2) {
    List.value = List2.value
  } else {
    List.value = List3.value
  }
}
Listshow()
const handleClick = (item) => {
  router.push({ path: '/details', query: { id: item.id } }) // 兑换按钮，携带id跳转页面
}

// 分页
const currentPage = ref(1)
const pageSize = ref(8)
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
.cardbox {
  display: flex;
  overflow: hidden;
  width: 80vw;
  margin: 0 auto;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 30px;
}
.el-card {
  position: relative;
  margin-bottom: 20px;
}
.xtcss {
  color: #fff;
  text-align: center;
  transform: rotate(-45deg);
  position: absolute;
  top: 25px;
  width: 300px;
  height: 30px;
  line-height: 30px;
  left: -100px;
}
.new {
  background-color: #03ae87;
}
.hot {
  background-color: #d61f39;
}
.title {
  margin-bottom: 20px;
}
.duihuan {
  display: flex;
  justify-content: space-between;
}
.points {
  display: flex;
  align-items: center;
  color: #eebe77;
}
</style>
