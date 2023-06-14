<template>
  <div class="home">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container mt-5">
      <h3 class="text-end">الوسوم</h3>
      <div class="row justify-content-end">
        <div class="parent-tags col-sm-12 col-lg-9 mt-4 position-relative pb-5">
          <div
            v-for="(tag, index) in pageOfItems"
            :key="index"
            class="box-tag ms-5 mb-5 text-end"
          >
            <router-link
              :to="{ name: 'tagArticles', params: { tagId: tag.id } }"
              class="text-dark"
            >
              <div class="img">
                <img :src="tag.tagPhoto" class="img-fluid w-100" />
              </div>
              <h3 class="text-end mt-3 me-2">{{ tag.tagName }}</h3>
            </router-link>
          </div>
          <jw-pagination
            class="pagination"
            :labels="customLabels"
            :pageSize="9"
            :items="tagsList"
            @changePage="onChangePage"
          >
          </jw-pagination>
        </div>
        <div class="col-lg-3 col-sm-12 pt-3">
          <Topics></Topics>
          <Tags></Tags>
          <Sections></Sections>
        </div>
        <!-- <div class="col-lg-3 col-sm-12">

      </div> -->
      </div>
    </div>
    <page-Seal></page-Seal>
  </div>
</template>

<script>
import profileNavBar from "@/components/profileNavbar/profileNavBar.vue";
import mainNavbar from "@/components/mainNavbar/mainNavbar.vue";
import Topics from "@/components/Topics/Topics.vue";
import Tags from "@/components/Tags/Tags.vue";
import pageSeal from "@/components/pageSeal/pageSeal.vue";
import Sections from "@/components/Sections/Sections.vue";
import JwPagination from "jw-vue-pagination";
import axios from "axios";
const customLabels = {
  first: "اول",
  last: "اخر",
  previous: "سابق",
  next: "التالي",
};
// @ is an alias to /src
export default {
  name: "TagsView",
  data() {
    return {
      tagsList: [],
      pageOfItems: [],
      customLabels,
    };
  },
  components: {
    profileNavBar,
    mainNavbar,
    Topics,
    Tags,
    pageSeal,
    Sections,
    JwPagination,
  },
  mounted() {
    let result = axios.get(`http://localhost:3000/tags`).then((response) => {
      this.tagsList = response.data;
    });
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
};
</script>
<style scoped>
.parent-tags {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  height: fit-content;
}
@media (max-width: 567px) {
  .box-tag {
    margin: 0 20px !important ;
  }
}
.pagination {
  display: flex !important;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.box-tag {
  border: 1px solid #f3f3f3;
}
.img {
  height: 65%;
  overflow: hidden;
}
.img img {
}
</style>
