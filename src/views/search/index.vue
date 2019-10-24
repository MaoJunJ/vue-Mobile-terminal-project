<template>
  <div>
    <form action="/">
      <van-search
        @input="onInput"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(value)"
        @cancel="onCancel"
      />
    </form>

    <!-- 联想建议 -->
    <van-cell-group v-if="suggestList.length > 0">
      <van-cell v-for="item in suggestList">
        <template slot="title">
          <div v-html="item"></div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <van-icon
          @click="trashShow=false"
          v-show="trashShow"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />

        <div v-show="!trashShow">
          <van-button round size="mini" type="info" @click="delAll">全部删除</van-button>
          <van-button round size="mini" type="primary" @click="trashShow=true">完成</van-button>
        </div>
      </van-cell>

      <van-cell
        v-for="(item,index) in historyList"
        icon="search"
        :title="item"
        @click="onSearch(item)"
      >
        <van-icon
          @click.stop="delRow(index)"
          v-show="!trashShow"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { suggest,getHistory, delHistory} from "@/api/article.js";
export default {
  name: "search",
  data() {
    return {
      value: "",
      suggestList: [],
      historyList:[],
      // 用来控制搜索历史最上面删除图标显示
      trashShow:true,
      timerID:'',
    };
  },

  methods: {

    async delAll(){

      // 发请求
      let res = await delHistory()
      // console.log(res);
      this.historyList = [];
      
    },

    delRow(index){

      this.historyList.splice( index,1 );
    },

    // 一输入就触发
    onInput() {
     
     if(this.timerID){

       clearTimeout(this.timerID)
     }
      
    this.timerID = setTimeout( async () => {

        // 要做空判断
      if (this.value.trim() == "") {
        this.suggestList = [];
        return; //不要发请求
      }

      //只要输入了，就立刻拿到你输入的内容，去做词语联想
      let res = await suggest(this.value);
      //   console.log(res);
      this.suggestList = res.data.data.options;

      // 循环遍历数组，拿出每个元素，再找到
      this.suggestList = this.suggestList.map(item => {
        //准备正则对象
        let reg = new RegExp(this.value, "g");
        // 把所有的关键字变成了span包起来
        item = item.replace(
          reg,
          `<span style="color:red">${this.value}</span>`
        );

        return item;
      });

      },300)
    },


    // 搜索时触发（软键盘上的search，pc端的回车）
    onSearch(key) {

      // this.historyList.push(this.value)
      this.$router.push("/list/" + key);
    },

    // 点击取消按钮触发
    // 只要你点击了会自动清空搜索内容
    onCancel() {
      console.log("取消了");
    }
  },

  async created(){
    
    let res = await getHistory();
    this.historyList = res.data.data.keywords;
  },

  destroyed(){

    console.log('销毁了');
    
  }
};
</script>

<style>
</style>