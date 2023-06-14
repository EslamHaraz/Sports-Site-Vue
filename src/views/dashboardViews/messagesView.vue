<template>
  <div class="parent">
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container container-border mt-5">
      <h3 class="text-white text-end fw-bold m-3">الرسائل</h3>
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
            <th scope="col">الاسم</th>
            <th class="td-display" scope="col">البريد الالكتروني</th>
            <th scope="col">محتوي الرساله</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(message, index) in search" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ message.Name }}</td>
            <td class="td-display">{{ message.Email }}</td>
            <td>{{ message.messageContent }}</td>
          </tr>
        </tbody>
      </table>
      <jw-pagination
        :pageSize="10"
        :items="messagesList"
        @changePage="onChangePage"
      >
      </jw-pagination>
    </div>
    <div v-if="messagesList.length == 0" class="message-Length">
      <h3>لا يوجد رسائل</h3>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "messagesView",
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  data() {
    return {
      messagesList: [],
      pageOfItems: [],
      value: "",
    };
  },
  mounted() {
    let result = axios.get(`http://localhost:3000/messages`).then((reponse) => {
      this.messagesList = reponse.data;
    });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.messageContent.includes(this.value.trim().toLowerCase())
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
