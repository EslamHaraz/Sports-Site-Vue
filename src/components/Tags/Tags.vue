<template>
  <div class="parent">
    <h3 class="news-container mb-2 text-end heading d-flex ">
      <span class="me-4">اهم الوسوم</span>
    </h3>
    
    <div
      class="mt-4 tags-Parent d-flex justify-content-evenly flex-wrap align-items-center"
    >
      <div v-for="(tag, index) in tags" :key="index" class="box-content mb-4">
        <h3 class="m-0 w-100">{{ tag.tagName }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tags",
  data() {
    return {
      tags: [],
    };
  },
  mounted() {
    let tags = axios.get(`http://localhost:3000/tags`).then((response) => {
      this.tags = response.data.slice(0, 10);
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
  border: 1px solid #e6d7da;
  padding: 10px;
  border-radius: 5px;
}
</style>
