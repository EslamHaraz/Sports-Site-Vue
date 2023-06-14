<template>
  <div class="container">
    <div class="row">
      <div class="col-12 main-Heading mb-5">
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <h3 class="text-end heading d-flex active">{{ sectionName }}</h3>
        </div>
      </div>
      <div
        v-for="(post, index) in pageOfItems"
        :key="index"
        class="col-sm-12 col-md-6 col-lg-4 mb-2"
      >
        <router-link
          :to="{
            name: 'articleView',
            params: { postId: post.id, sectionId: post.sectionId },
          }"
        >
          <img :src="post.postPhoto" class="img-fluid" />
          <div class="box-content">
            {{ post.postAddress }}
          </div>
        </router-link>
      </div>
    </div>
    <jw-pagination
      :labels="customLabels"
      :pageSize="6"
      :items="postesList"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
import axios from "axios";
import JwPagination from "jw-vue-pagination";
const customLabels = {
  first: "اول",
  last: "اخر",
  previous: "سابق",
  next: "التالي",
};
export default {
  name: "articlesNews",
  components: {
    JwPagination,
  },
  data() {
    return {
      postesList: [],
      randomNumber: "",
      sectionsList: [],
      sectionName: "",
      sectionId: "",
      customLabels,
      pageOfItems: [],
    };
  },

  mounted() {
    let result = axios
      .get(`http://localhost:3000/posts`)
      .then((response) => {
        this.postesList = response.data;
        this.getrandomNumber(response.data.length);
        this.sectionId = this.postesList[this.randomNumber].sectionId;
      })
      .then((response) => {
        let postes = axios
          .get(`http://localhost:3000/posts?sectionId=${this.sectionId}`)
          .then((response) => {
            this.postesList = response.data;
          })
          .then((response) => {
            let result = axios
              .get(`http://localhost:3000/sections/${this.sectionId}`)
              .then((response) => {
                this.sectionName = response.data.sectionName;
              });
          });
      });
  },
  methods: {
    getrandomNumber(value) {
      return (this.randomNumber = Math.trunc(Math.random() * value));
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
};
</script>
<style>
.box-content {
  padding: 20px;
  border: 1px solid #ddd;

  font-size: 20px;
  font-weight: 600;
}
</style>
