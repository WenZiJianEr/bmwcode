<template>
  <div class="box">
    <div style="width: 60vw; margin: 0 auto; margin-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的兑换</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="width: 60vw; margin: 0 auto; margin-bottom: 30px">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        "
      >
        <div style="display: flex; align-items: center">
          <el-row class="demo-avatar demo-basic">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl || squareUrl" />
                </div>
              </div>
            </el-col>
          </el-row>
          <div style="margin-left: 20px">
            {{ data.user }}
            <div
              style="
                margin-top: 5px;
                display: flex;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
              "
              @click="handleClick = true"
            >
              <el-icon style="color: #5280f2"><Location /></el-icon>收货地址
            </div>
          </div>
        </div>
        <div class="Mypoints">
          <div
            @click="dialogTableVisible = true"
            style="
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 5px;
              cursor: pointer;
            "
          >
            我的积分
            <span>&gt;</span>
          </div>
          <div
            style="
              text-align: center;
              font-weight: bold;
              font-size: 20px;
              color: #ff6620;
            "
          >
            {{ data.points }}
          </div>
        </div>
      </div>
      <ul class="ulbox">
        <li @click="handleClick1">
          <div>{{ data.state.due }}</div>
          <div>全部</div>
        </li>
        <li @click="handleClick2">
          <div>{{ data.state.sent }}</div>
          <div>待发货</div>
        </li>
        <li @click="handleClick3">
          <div>{{ data.state.received }}</div>
          <div>待收货</div>
        </li>
        <li style="border: 0" @click="handleClick4">
          <div>{{ data.state.evaluated }}</div>
          <div>已收货</div>
        </li>
      </ul>
    </el-card>
    <el-card style="width: 60vw; margin: 0 auto">
      <el-card v-for="item in List" style="margin-bottom: 5px">
        <div style="display: flex">
          <div style="width: 10vw; height: 15vh">
            <img :src="item.picurl" alt="" style="width: 100%; height: 100%" />
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              width: 40vw;
              margin-left: 50px;
              align-items: center;
            "
          >
            <div>{{ item.title }}</div>
            <div style="text-align: right">
              <div>{{ item.points }}积分</div>
              <div>×{{ item.amount }}</div>
            </div>
          </div>
        </div>
        <div
          style="margin-top: 15px; display: flex; justify-content: end"
          v-if="buttonstate"
        >
          <el-button>查看物流</el-button>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="请确认无误后再确认收货"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button type="warning">确认收货</el-button>
            </template>
          </el-popconfirm>
        </div>
        <div
          style="margin-top: 15px; display: flex; justify-content: end"
          v-if="!buttonstate"
        >
          <el-button @click="Viewlogistics(item)">查看物流</el-button>

          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="删除之后将不可找回，请谨慎操作"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button type="danger">删除订单</el-button>
            </template>
          </el-popconfirm>
          <el-button type="warning" @click="handleagain(item)"
            >再兑一单</el-button
          >
        </div>
      </el-card>
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
    </el-card>
    <el-dialog
      v-model="dialogTableVisible"
      title="兑换记录"
      style="width: 40vw; max-height: 50vh; overflow: auto"
      overflow="true"
    >
      <ul class="dialogul">
        <li v-for="item in gridData">
          <div>
            <span>{{ item.address }}</span>
            <span>{{ item.date }}</span>
          </div>
          <div>
            {{ item.name }}<el-icon style="color: #eebd75"><Coin /></el-icon>
          </div>
        </li>
      </ul>
    </el-dialog>
    <el-dialog v-model="handleClick" width="60vw">
      <Table style="width: 100%"></Table>
    </el-dialog>
    <el-dialog v-model="centerDialogVisible" title="物流信息" center>
      <div style="margin-bottom: 20px">物流公司：{{ Viewlog.corporation }}</div>
      <div>物流单号：{{ Viewlog.Oddnumber }}</div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue'
import Table from '@/components/Center/Table.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const List = ref([])

const data = ref({
  user: '用户名',
  points: '453030',
  DeliveryAddress: [{}],
  state: {
    due: '0',
    sent: '0',
    received: '10',
    evaluated: '8',
    refund: '0'
  }
})
const All = ref([
  {
    title: '玻璃茶壶泡茶',
    points: '1800',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: false,
    new: true,
    needpoints: 1801,
    amount: '2',
    state: 1
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
    needpoints: 1801,
    amount: '1',
    state: 2
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
    needpoints: 1801,
    amount: '1',
    state: 4
  }
])
const shipments = ref([
  {
    title: '玻璃茶壶泡茶1',
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
    title: '玻璃茶壶泡茶2',
    points: '900',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: false,
    new: true,
    needpoints: 1801
  }
])

const Waitreceived = ref([
  {
    title: '玻璃茶壶泡茶3',
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
    title: '玻璃茶壶泡茶3',
    points: '900',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: false,
    new: true,
    needpoints: 1801
  }
])
const received = ref([
  {
    title: '玻璃茶壶泡茶4',
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
    title: '玻璃茶壶泡茶4',
    points: '900',
    picurl: '',
    id: '2',
    picurl:
      'https://img.alicdn.com/imgextra/i3/2212034690441/O1CN01rZk2RD1F81W6wxzgB_!!2212034690441.jpg',
    hot: false,
    new: true,
    needpoints: 1801
  }
])
const handleClick = ref(false)
const pointsState = ref(1)
const buttonstate = ref(false)
const gridData = [
  {
    date: '2016-05-02 23:37',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-04 15:12',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-01 16:46',
    name: '-2100',
    address: '商品兑换'
  },
  {
    date: '2016-05-03 19:50',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-01 16:46',
    name: '-2100',
    address: '商品兑换'
  },
  {
    date: '2016-05-03 19:50',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-01 16:46',
    name: '-2100',
    address: '商品兑换'
  },
  {
    date: '2016-05-03 19:50',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-01 16:46',
    name: '-2100',
    address: '商品兑换'
  },
  {
    date: '2016-05-03 19:50',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-01 16:46',
    name: '-2100',
    address: '商品兑换'
  },
  {
    date: '2016-05-03 19:50',
    name: '+100',
    address: '签到增加积分'
  },
  {
    date: '2016-05-01 16:46',
    name: '-2100',
    address: '商品兑换'
  },
  {
    date: '2016-05-03 19:50',
    name: '+100',
    address: '签到增加积分'
  }
]
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl: ''
})
const handleClick1 = () => {
  pointsState.value = 1
  statedetermine()
}
const handleClick2 = () => {
  pointsState.value = 2
  statedetermine()
}
const handleClick3 = () => {
  pointsState.value = 3
  statedetermine()
}
const handleClick4 = () => {
  pointsState.value = 4
  statedetermine()
}
const dialogTableVisible = ref(false)
const { circleUrl, squareUrl, sizeList } = toRefs(state)
const statedetermine = () => {
  if (pointsState.value == 1) {
    List.value = All.value
    buttonstate.value = false
  } else if (pointsState.value == 2) {
    List.value = shipments.value
    buttonstate.value = false
  } else if (pointsState.value == 3) {
    List.value = Waitreceived.value
    buttonstate.value = false
  } else {
    List.value = received.value
    buttonstate.value = true
  }
}

const confirmEvent = () => {
  // console.log('confirm!')
}
const cancelEvent = () => {
  // console.log('cancel!')
}
const centerDialogVisible = ref(false)
const Viewlog = ref()

const Viewlogistics = (item) => {
  // console.log(item);

  const data = {
    corporation: '圆通快递',
    Oddnumber: 'YT1238328349'
  }
  Viewlog.value = data
  centerDialogVisible.value = true
}
const handleagain = (item) => {
  // console.log(item)
  router.push({ path: '/details', query: { id: item.id } })
}

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



statedetermine()
</script>

<style lang="scss" scoped>
.box {
  padding-top: 20px;
  box-sizing: border-box;
}
/* .demo-basic {
  /* text-align: center; 
} 
*/
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  align-items: center;
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.demo-basic .block {
  flex: 1;
}
.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.ulbox {
  width: 100%;
  display: flex;
  justify-content: space-around;
  list-style: none;
  align-items: center;
  text-align: center;
  li {
    flex: 1;
    border-right: 2px solid #f8f9fa;
    box-sizing: border-box;
    cursor: pointer;
  }
  li div:nth-child(1) {
    font-weight: bold;
  }
  li div:nth-child(2) {
    font-size: 12px;
  }
}
.Mypoints {
  width: 10vw;
  height: 70px;
  background-color: #ffeee6;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 10px;
}
.dialogul {
  list-style: none;
  li {
    border-bottom: 1px solid #ebeaea;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 12px;
  }
  li div:nth-child(2) {
    font-weight: bold;
  }
}
</style>
