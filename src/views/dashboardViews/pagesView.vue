<template>
  <div class="parent">
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">الصفحات</h3>
      <form @submit.prevent class="d-flex align-items-center mt-4">
        <div class="input-search">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="بحث"
            v-model="value"
          />
        </div>
        <button
          type="submit"
          class="btn search-btn fw-bold d-flex align-items-center justify-content-around text-white"
        >
          بحث
          <FontAwesome :icon="['fas', 'search']" class="text-white" />
        </button>
      </form>
      <table class="table table-striped taple-bg mt-4">
        <thead>
          <tr>
            <th scope="col " class="col-width">#</th>
            <th scope="col">العنوان</th>
            <th class="td-display" scope="col">الرابط الدائم</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(page, index) in search" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ page.pageName }}</td>
            <td class="td-display">{{ page.link }}</td>
            <td>
              <router-link
                :to="{ name: 'editPage', params: { pageId: page.id } }"
              >
                <button class="btn btn-primary ms-3 edit">
                  تعديل
                  <FontAwesome
                    :icon="['fas', 'pen-to-square']"
                    class="text-white"
                  />
                </button>
              </router-link>
              <button class="btn btn-danger" disabled>
                حذف
                <FontAwesome :icon="['fas', 'trash']" class="text-white" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <jw-pagination
        :pageSize="10"
        :items="pagesList"
        @changePage="onChangePage"
      >
      </jw-pagination>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "pagesView",
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  data() {
    return {
      pagesList: [],
      pageOfItems: [],
      value: "",
    };
  },
  mounted() {
    let resukt = axios.get(`http://localhost:3000/pages`).then((response) => {
      this.pagesList = response.data;
    });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.pageName.includes(this.value.trim().toLowerCase())
        );
      } else {
        return this.pageOfItems;
      }
    },
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
};
</script>
<style scoped></style>
