<template>
  <div class="container mt-5 mb-5 bg-white p-3">
    <div class="row row-direction">
      <div class="col-sm-12 col-lg-9">
        <div
          class="news-container mb-4 d-flex justify-content-between align-items-center"
        >
          <h3 class="text-end heading d-flex active">
            {{ sectionName }}
            <h3 class="text-dark">الكل</h3>
          </h3>
        </div>
        <div class="nested-centainer">
          <div
            v-for="(post, index) in pageOfItems"
            :key="index"
            class="p-0 ms-4 box-news mb-4"
            v-if="post.postStatus === 'to publish'"
          >
            <router-link
              :to="{
                name: 'articleView',
                params: { postId: post.id, sectionId: post.sectionId },
              }"
              class="text-dark"
            >
              <img :src="post.postPhoto" class="img-fluid" />
              <h4 class="content">
                {{ post.postAddress }}
              </h4>
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
      <div class="col-lg-3 col-sm-12">
        <Sections></Sections>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Sections from "../Sections/Sections.vue";
import JwPagination from "jw-vue-pagination";
const customLabels = {
  first: "اول",
  last: "اخر",
  previous: "سابق",
  next: "التالي",
};
export default {
  name: "sectionTwo",
  components: {
    Sections,
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
<style scoped>
.content {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
}

.box-news {
  margin-right: 10px;
  box-shadow: 0px 0px 2px 1px #d8d6d6;
}
.heading {
  padding: 0 30px 0 0;
}
.heading,
.heading h3 {
  font-size: 25px;
}
.heading h3 {
  margin-right: 20px;
  margin-bottom: 0;
}
.news-container {
  height: 40px;
  margin-bottom: 0;
  border: 1px solid rgb(250, 250, 250);
  border-right: 5px solid var(--main-Color);
}
.more {
  font-size: 20px;
}
.arrow-right {
  transform: rotate(-90deg);
  margin-right: 10px;
  color: var(--main-Color);
}
.nested-centainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
@media (max-width: 991px) {
  .row-direction {
    flex-direction: column;
  }
}
.date {
  width: fit-content;
  font-size: 15px;
  margin-right: 4px;
}
</style>
