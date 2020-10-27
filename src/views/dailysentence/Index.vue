<template>
<!-- @name 
  -- @author qijianshuang
  -- @date 2020-10-26
  -->
  <div id="dailysentence">
      <h2>每日一句</h2>
      <div class="container">
          <div class="input_wrap">
              <input type="text" placeholder="请输入每日一句……" @keydown.enter="handlerEnter">
          </div>
          <div class="trans_result">
              {{transResult}}
          </div>
      </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import MD5 from 'js-md5'
import {getTranslateResult} from '@/api/api.js'
export default  {
    data () {
        return {
            query:'',
            transResult:''
        }
    },
    computed: {
        ...mapState({
            appid:state=>state.appid,
            key:state=>state.key
        })
    },
    methods: {
        handlerEnter(e){
            // console.log(e.target.value);
            // console.log(this.appid);
            // console.log(this.key);
            this.query = e.target.value;
            let salt = (new Date).getTime();
            let str = this.appid + this.query + salt + this.key;
            var sign = MD5(str);
            
            let params = {
                q:this.query,    //要翻译的数据
                appid: this.appid,
                salt: salt,     //时间戳
                from: 'en',  //从英语
                to: 'zh',    //到（翻译成）中文
                sign: sign
            }
            getTranslateResult(params).then(data=>{
                console.log(data);
                this.transResult = data.data.trans_result[0].dst
            }).catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>
<style>

</style>