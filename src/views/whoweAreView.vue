<template>
  <div class="parent">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container mb-5">
      <h1 class="fw-bold">من نحن</h1>
      <div class="text-box">
        <p v-html="content"></p>
      </div>
    </div>
    <page-Seal></page-Seal>
  </div>
</template>
<script>
import profileNavBar from "@/components/profileNavbar/profileNavBar.vue";
import mainNavbar from "@/components/mainNavbar/mainNavbar.vue";
import pageSeal from "@/components/pageSeal/pageSeal.vue";
import axios from "axios";
export default {
  name: "whoweAreView",
  components: {
    profileNavBar,
    mainNavbar,
    pageSeal,
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    let content = axios
      .get(`http://localhost:3000/pages?link=whoweAre`)
      .then((response) => {
        this.content = response.data[0].content;
      });
  },
};
</script>
<style scoped>
.text-box {
  font-size: 31px;
  border: 1px solid #ddd;
  padding: 20px;
  margin: auto;
  line-height: 2;
}
.parent {
  background-color: white;
}
</style>
