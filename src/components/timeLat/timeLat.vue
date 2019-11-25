<template>
  <div class="timeLat" v-if="timeLatShow">
    <popup v-model="timeLatShow" position="top" :close-on-click-overlay="false">
      <div class="timeLat-title">
        <span>时间维度</span>
      </div>
      <div class="timeLat-select" @click="timeLatChange">
        <div :class="{'timeLat-select-item':true,'timeLat-select-active':this.activeCon['year']}" data-type="year">年</div>
        <div :class="{'timeLat-select-item':true,'timeLat-select-active':this.activeCon['month']}" data-type="month">月</div>
        <div :class="{'timeLat-select-item':true,'timeLat-select-active':this.activeCon['day']}" data-type="day">日</div>
      </div>
      <div class="timeLat-title">
        <span>开始时间：{{startDate_}}</span>
        <img @click="calenDarShow('start')" :src="require('_img/calendar.png')">
      </div>
      <div class="timeLat-title">
        <span>结束时间：{{endDate_}}</span>
        <img @click="calenDarShow('end')" :src="require('_img/calendar.png')">
      </div>
      <div class="timeLat-but">
        <v-Button @click="hide">取消</v-Button>
        <v-Button type="info" @click="reset">重置</v-Button>
        <v-Button type="info" @click="ok">确认</v-Button>
      </div>
    </popup>
    <popup v-model="calShow" position="bottom" :overlay="false">
      <div class="timeLat-content">
        <datetime-picker  
           show-toolbar
           @confirm="timeSel"
           @cancel="calShow = false"
           :visible-item-count="3" 
           v-if="type !== 'year'" 
           :type="type_" v-model="cacheDate" 
           :min-date="minDate.toDate()" 
           :max-date="maxDate.toDate()"></datetime-picker>
        <picker 
           @confirm="timeSel"
           @cancel="calShow = false"
           show-toolbar
           :visible-item-count="3" 
           :default-index="yearIndex" 
           v-else 
           :columns="years"></picker>
      </div>
    </popup>
  </div>
</template>

<script>
import { Message } from "@/util/util.js"
import dayjs from "dayjs"
let now = dayjs().hour(0).minute(0).second(0).millisecond(0)
export default {
  name: "timeLat",
  data() {
    let me = this
    return {
      activeCon: {
        day: false,
        month: true,
        year: false
      },
      startDate: now.date(1).subtract(5,'month'),
      endDate:  now.date(1).add(6,'month'),
      type: "month",
      // calendar
      calShow: false,
      // 时间缓存
      cacheDate: now,
      // 时间type 开始时间|结束时间
      timeType: 'start',
      // 维度显示
      timeLatShow:false
    }
  },
  computed: {
    type_() {
      let type = {
        month: "year-month",
        year: "year",
        day: "date"
      };
      return type[this.type];
    },
    startDate_() {
      if (this.type === "year") {
        return this.startDate.format("YYYY")
      }
      if (this.type === "month") {
        return this.startDate.format("YYYY/MM")
      }
      return this.startDate.format("YYYY/MM/DD")
    },
    endDate_() {
      if (this.type === "year") {
        return this.endDate.format("YYYY")
      }
      if (this.type === "month") {
        return this.endDate.format("YYYY/MM")
      }
      return this.endDate.format("YYYY/MM/DD")
    },
    years() {
      let currentYear = Number(now.format("YYYY"));
      let _arr = [];
      let _year = 1960;
      while (_year <= Number(this.maxDate.format("YYYY"))) {
        _arr.push(_year);
        _year++;
      }
      return _arr;
    },
    yearIndex() {
      let currentYear = Number(dayjs(this.cacheDate).format("YYYY"))
      return currentYear - 1960;
    },
    // 最大日期
    maxDate() {
      return now.add(10, "year");
    },
    minDate() {
      return now.set("year", 1960);
    }
  },
  methods: {
    ok() {
      if (this.type === 'year' && (this.startDate.year() - this.endDate.year() > 0)) {
         Message("开始时间应小于结束时间");
         return;
      }
      else if (this.type === 'year' && (this.endDate.year() - this.startDate.year() > 30)) {
        Message("年度区间应小于30年");
        return;
      }
      else if (this.type === 'month' && (this.endDate.diff(this.startDate,'month') > 36)) {
        Message("月度区间应小于36月");
        return;
      }
       else if (this.type === 'day' && (this.endDate.diff(this.startDate,'day') > 180)) {
        Message("日度区间应小于180日");
        return;
      }
      else if (this.type !== 'year' && this.startDate.valueOf() - this.endDate.valueOf() > 0) {
          Message("开始时间应小于结束时间");
          return;
      }
      this.$emit("change", {
        start: this.startDate,
        end: this.endDate,
        type: this.type
      })
      this.hide()
    },
    //
    timeLatChange(e) {
      let type = e.target.dataset.type;
      if (!type) return;
      for (let i in this.activeCon) {
        this.activeCon[i] = false;
        if (i === type) {
          this.activeCon[i] = true;
        }
      }
      this.type = type;
      this.calShow = false
      if (type === 'year'){
        this.startDate = now
        this.endDate = now.add(1,'year')
      }
      if(type === 'month') {
        this.startDate = now.subtract(5,'month')
        this.endDate = now.add(6,'month')
      }
      if (type === 'day') {
        let currentDate = now
        this.startDate = currentDate.set('date',1)
        this.endDate = this.startDate.add(currentDate.daysInMonth()-1,'day')
      }
    },
    // 重置
    reset() {
      this.startDate =  now.subtract(5,'month');
      this.endDate = now.add(6,'month');
      this.type = "month";
      this.activeCon = {
        day: false,
        month: true,
        year: false
      }
    },
    calenDarShow(type) {
      this.timeType = type
      if (type === 'start') {
        this.cacheDate = this.startDate.toDate()
      }else{
        this.cacheDate = this.endDate.toDate()
      }
      this.calShow = true
    },
    // 时间选择
    timeSel (val) {
      if(this.timeType === 'start') {
        this.startDate = dayjs(String(val))
      }else{
        this.endDate = dayjs(String(val))
      }

      this.calShow = false
    },
    show () {
      this.timeLatShow = true
    },
    hide () {
      this.timeLatShow = false
    }
  }
}
</script>

<style lang='scss' scoped>
.timeLat {
  padding: 10px;
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
  z-index:1000;
  &-title {
    font-size: 14px;
    font-weight: blod;
    color: #000;
    padding: 24px 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  img {
    width: 20px;
  }
  &-select {
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    &-item {
      min-width: 99px;
      height: 29px;
      border: 1px solid #dddd;
      border-radius: 2px;
      font-size: 14px;
      text-align: center;
      line-height: 29px;
      color: #666;
    }
     &-active {
        border: 1px solid $color-blue;
        color: $color-blue;
      }
  }
  &-but {
    display: flex;
    justify-content: space-around;
    padding: 30px 0 15px 0px;
    button {
      width: 80px;
      padding: 0;
    }
  }
}
</style>
<style>
.van-popup {
  border-radius: 0;
}
</style>
