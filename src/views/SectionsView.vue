<template>
  <div class="home">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container mt-5">
      <h3 class="text-end">الاقسام</h3>
      <div class="row justify-content-end">
        <div class="parent-tags col-sm-12 col-lg-9 mt-4 position-relative mb-5">
          <div
            v-for="(section, index) in pageOfItems"
            :index="index"
            class="box-tag ms-5 mb-5"
          >
            <router-link :to="{ name: 'sectionArticles',params:{sectionId:section.id} }">
              <img :src="section.sectionPhoto" class="img-fluid" />
              <h3 class="text-end mt-3">{{ section.sectionName }}</h3>
              <h5 class="text-end">يوجد 3 مقالات بهذا القسم</h5>
            </router-link>
          </div>
          <jw-pagination
            class="pagination"
            :pageSize="10"
            :items="sectionList"
            @changePage="onChangePage"
            :labels="customLabels"
          >
          </jw-pagination>
        </div>
        <div class="col-lg-3 col-sm-12">
          <Topics></Topics>
          <Tags></Tags>
          <Sections></Sections>
        </div>
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
// @ is an alias to /src
const customLabels = {
  first: "اول",
  last: "اخر",
  previous: "سابق",
  next: "التالي",
};
export default {
  name: "SectionsView",
  data() {
    return {
      sectionList: [],
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
    let result = axios
      .get(`http://localhost:3000/sections`)
      .then((response) => {
        this.sectionList = response.data;
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
    margin: 0 20px !important;
  }
}
.pagination {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
img {
  height: 150px;
}
.box-tag {
  text-align: right;
}
</style>
