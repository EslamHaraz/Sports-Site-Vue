<template>
  <div class="parent">
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <statistics></statistics>
    <dashboardFooter></dashboardFooter>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import statistics from "@/components/Dashboard/statistics.vue";
import dashboardFooter from "@/components/Dashboard/dashboardFooter.vue";
import axios from 'axios';
export default {
  name: "dashboardView",
  components: {
    dashboardNavbar,
    routersNavbar,
    statistics,
    dashboardFooter,
  },
  mounted() {
    let admin = window.localStorage.getItem("admin-info");
    if (!admin) {
      this.$router.push({ name: "adminLogin" });
    }
  },
};
</script>
<style >
body.dasboard {
  background-color: var(--section-Color) !important;
}
</style>
