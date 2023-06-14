<template>
  <div class="parent">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container mt-3">
      <h2 class="fw-bold">سياسه الخصوصيه</h2>
      <p v-html="content" class="privacy-text"></p>
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
  name: "privacyView",
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
      .get(`http://localhost:3000/pages?link=privacy`)
      .then((response) => {
        this.content = response.data[0].content;
      });
  },
};
</script>
<style scoped>
.privacy-text {
  font-size: 21px;
  max-width: 700px;
  margin: 20px auto 40px;
  font-weight: 600;
  line-height: 2;
  background-color: white;
  padding: 10px;
  border-radius: 18px;
  box-shadow: 0px 0px 5px -2px var(--main-Color);
}
.parent {
  background-color: white;
}
</style>
