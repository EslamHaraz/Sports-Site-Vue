<template>
  <div class="parent">
    <h3 class="news-container mb-2 text-end heading d-flex">
      <span class="me-4">اهم الاقسام</span>
    </h3>
    <div
      v-for="(section, index) in importantSections"
      :key="index"
      class="box-content mb-4"
    >
      <h3 class="m-0 w-100 d-flex justify-content-between">
        {{ section.sectionName }}
        <h3 class="m-0">{{index+1}}</h3>
      </h3>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Sections",
  data() {
    return {
      importantSections: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/sections`)
      .then((response) => {
        this.importantSections = response.data;
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
  width: 100%;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  border-left: 3px solid var(--main-Color) !important;
}
</style>
