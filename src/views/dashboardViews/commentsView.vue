<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم حذف التعليق بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>حدث خطأ 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">التعليقات</h3>
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
            <th scope="col">المستخدم</th>
            <th scope="col">التعليق</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(comment, index) in search" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ comment.user }}</td>
            <td>{{ comment.comment }}</td>
            <td>
              <button
                @click="getData(comment.id, index)"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                حذف
                <FontAwesome :icon="['fas', 'trash']" class="text-white" />
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        حذف التعليق
                      </h5>
                    </div>
                    <h4 class="modal-body">هل انت متأكد من حذف التعليق ؟</h4>
                    <div class="modal-footer">
                      <button
                        id="close"
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        الغاء
                      </button>
                      <button
                        @click="deleteComment()"
                        type="button"
                        class="btn btn-danger"
                      >
                        حذف الان
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <jw-pagination
        :pageSize="10"
        :items="commenstList"
        @changePage="onChangePage"
      >
      </jw-pagination>
      <div v-if="commenstList.length == 0" class="message-Length">
        <h3>لا يوجد تعليقات</h3>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "commentsView",
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  data() {
    return {
      commenstList: [],
      commentId: "",
      commentIndex: "",
      successActive: "",
      errorActive: "",
      value: "",
      pageOfItems: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/comments`)
      .then((response) => {
        this.commenstList = response.data;
        console.log(this.commenstList);
      });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.comment.includes(this.value.trim().toLowerCase())
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
    getData(id, index) {
      this.commentId = id;
      this.commentIndex = index;
    },
    deleteComment() {
      let result = axios
        .delete(`http://localhost:3000/comments/${this.commentId}`)
        .then((response) => {
          this.successActive = true;
          this.errorActive = false;
          this.commenstList.splice(this.index, 1);
          document.getElementById("close").click();
        })
        .catch((reject) => {
          this.successActive = false;
          this.errorActive = true;
        });
    },
  },
};
</script>
