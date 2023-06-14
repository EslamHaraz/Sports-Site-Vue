<template>
  <div class="">
    <h3 class="news-container mb-2 text-end heading d-flex">
      <span class="me-4">موضوعات هامه</span>
    </h3>
    <div
    v-for="(topic,index) in topicList" :key="index"
      class="box-content mb-4 d-flex justify-content-evenly align-items-center"
    >
      <span class="d-block text-white p-2 mt-3 mb-3 ms-2">{{index+1}}</span>
      <h3 class="m-0 w-100">{{topic.postAddress}}</h3>
    </div>
   
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Topics",
  data() {
    return {
      topicList: []
    };
  },
  mounted() {
    let postes = axios
      .get(`http://localhost:3000/posts`)
      .then((response) => {
        this.topicList = response.data;
        this.topicList =  this.topicList.reverse()
        this.topicList =  this.topicList.slice(0,6)

      });
  },
};
</script>
<style scoped>
.box-content span {
  background-color: #ff1949;
  font-weight: 700;
}
.box-content h3 {
  font-size: 17px;
  font-weight: 600;
}
.box-content {
  padding: 10px !important;
}
</style>
