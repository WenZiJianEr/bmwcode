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
        <li>
          <div>{{ data.state.due }}</div>
          <div>待付款</div>
        </li>
        <li>
          <div>{{ data.state.sent }}</div>
          <div>待发货</div>
        </li>
        <li>
          <div>{{ data.state.received }}</div>
          <div>待收货</div>
        </li>
        <li>
          <div>{{ data.state.evaluated }}</div>
          <div>待评价</div>
        </li>
        <li style="border: 0">
          <div>{{ data.state.refund }}</div>
          <div>退款/售后</div>
        </li>
      </ul>
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
    <Table style="width: 60vw; margin: 0 auto"></Table>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue'
import Table from '@/components/Center/Table.vue'
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
const dialogTableVisible = ref(false)
const { circleUrl, squareUrl, sizeList } = toRefs(state)
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
