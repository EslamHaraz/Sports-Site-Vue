<template>
  <div class="home">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <slider-News></slider-News>
    <lastest-News></lastest-News>
    <section-One></section-One>
    <section-Two></section-Two>
    <section-Three></section-Three>
    <page-Seal></page-Seal>
  </div>
</template>

<script>
import profileNavBar from "@/components/profileNavbar/profileNavBar.vue";
import mainNavbar from "@/components/mainNavbar/mainNavbar.vue";
import sliderNews from "@/components/sliderNews/sliderNews.vue";
import lastestNews from "@/components/lastestNews/lastestNews.vue";
import sectionOne from "@/components/sectionOne/sectionOne.vue";
import sectionTwo from "@/components/sectionTwo/sectionTwo.vue";
import sectionThree from "@/components/sectionThree/sectionThree.vue";
import pageSeal from "@/components/pageSeal/pageSeal.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    profileNavBar,
    mainNavbar,
    sliderNews,
    lastestNews,
    sectionOne,
    sectionTwo,
    sectionThree,
    pageSeal,
  },
};
</script>
<style>
.home {
  background-color: white;
}
</style>
