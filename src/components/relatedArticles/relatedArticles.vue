<template>
  <div class="container">
    <h3 data-v-3d11210f="" class="news-container mb-2 text-end heading d-flex">
      <span data-v-3d11210f="" class="me-4"> مقالات ذات الصله</span>
    </h3>
    <div
      v-for="(article, index) in atricles"
      :key="index"
      class="article-box text-end mt-4 d-flex align-items-center mb-3"
    >
      <img :src="article.postPhoto" />
      <div class="content d-flex flex-column">
        <h4 class="mb-3 me-3">{{ article.postAddress }}</h4>
        <h6 class="mb-0 me-3">اخبار منذ 15 ساعه</h6>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "relatedArticles",
  data() {
    return {
      sectionId: this.$route.params.sectionId,
      atricles: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/posts?sectionId=${this.sectionId}`)
      .then((response) => {
        this.atricles = response.data;
        this.atricles = this.atricles.reverse();
        this.atricles = this.atricles.slice(0, 6);
        console.log(this.atricles);
      });
  },
};
</script>
<style scoped>
.article-box img {
  width: 30%;
}
</style>
