
<template>
  <div class="devicelist">
      <mt-loadmore :top-method="loadTop"  ref="loadmore">
        <div v-for="item in items">
          <div>
            <div class="cell-title">设备型号：{{item.iphoneType}} {{item.phoneVersion}}</div>
            <div class="cell-text">最近登录：{{item.mtime}}</div>
            <div class="cell-text">设备标识：{{item.uuid}}</div>
            <div class="cell-line"></div>
          </div>
        </div>
      </mt-loadmore>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
    data(){
      return{
          items:[],
      }
    },
    created: function () {
      this.reloadData();
    },
    methods: {
      reloadData(){
        var URL = 'http://xggserve.com/xgg/getdevicelist';
        var Obj = {
          token:'fxxinfotech',
        };
        var weak_this = this;
        axios.post(URL,Obj).then((response) => {
          var array = response.data;
          this.items = [];
          for(var i = 0;i<array.length;i++){
            var obj = array[i];
            var mtime = obj.mtime;
            var newDate = new Date();
            newDate.setTime(mtime * 1000);
            obj.mtime = newDate.toLocaleString()
            this.items.push(obj);
            setTimeout(()=>{
              weak_this.$refs.loadmore.onTopLoaded();
            },1000);
          }
        }).catch(function (){
        });
      },
      loadTop(){
        this.reloadData();
      }
    }
  }
</script>
<style>
  .devicelist{
    background-color: white;
  }
  .devicelist .cell-title{
    margin-top: 5px;
    margin-left: 10px;
    color: #666666;
    margin-bottom: 5px;
  }
  .devicelist .cell-text{
    margin-top: 0px;
    margin-left: 10px;
    color: #999999;
    margin-bottom: 5px;
    font-size: 10px;
  }
  .devicelist .cell-line{
    width: 200%;
    margin-bottom: 0px;
    background-color: #eeeeee;
    height: 1px;
    transform-origin: 0 0;
    transform: scale(0.5, 0.5);
  }
</style>
