<template>
  <div class="parent">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-12 col-lg-9">
          <div class="nested-centainer">
            <div
              v-for="(post, index) in postes"
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
          <h3
            class="bg-danger text-white w-50 m-auto p-2"
            v-if="postes.length < 1"
          >
            لا يوجد مقالات عن هذا الفريق
          </h3>
        </div>
        <div class="col-lg-3 col-sm-12">
          <Tags></Tags>
        </div>
      </div>
    </div>
    <page-Seal></page-Seal>
  </div>
</template>
<script>
import profileNavBar from "@/components/profileNavbar/profileNavBar.vue";
import mainNavbar from "@/components/mainNavbar/mainNavbar.vue";
import pageSeal from "@/components/pageSeal/pageSeal.vue";
import Tags from "../Tags/Tags.vue";
import axios from "axios";
export default {
  name: "tagArticles",
  components: {
    profileNavBar,
    mainNavbar,
    pageSeal,
    Tags,
  },
  data() {
    return {
      sectionId: this.$route.params.tagId,
      postes: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/posts?tagId=${this.sectionId}`)
      .then((response) => {
        this.postes = response.data;
        console.log(this.postes);
      });
  },
};
</script>
<style scoped>
.parent {
  background-color: white;
}
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
