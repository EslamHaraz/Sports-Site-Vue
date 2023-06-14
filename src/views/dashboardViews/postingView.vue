<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم حذف التدوينه بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>خطأ 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">التدوينات</h3>
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
        <router-link :to="{ name: 'addPost' }">
          <button
            type="button"
            class="btn add-btn me-3 fw-bold d-flex align-items-center justify-content-around text-white"
          >
            اضف

            <FontAwesome :icon="['fas', 'plus']" class="text-white" />
          </button>
        </router-link>
      </form>
      <table class="table table-striped taple-bg mt-4 table-responsive">
        <thead>
          <tr>
            <th scope="col " class="col-width td-display">#</th>
            <th scope="col">العنوان</th>
            <th class="td-display" scope="col">الكاتب</th>
            <th class="td-display" scope="col">الحاله</th>
            <th class="td-display" scope="col">التعليقات</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in search" :key="index">
            <th class="td-display" scope="row">{{ index + 1 }}</th>
            <td>{{ post.postAddress }}</td>
            <td class="td-display">admin</td>
            <td class="td-display" v-if="post.appear === 'public'">عام</td>
            <td v-if="post.appear === 'private'">خاص</td>
            <td v-if="post.commentsStatus === 'enabled'" class="td-display">
              مفعل
            </td>
            <td v-if="post.commentsStatus === 'disabled'" class="td-display">
              غير مفعل
            </td>
            <td>
              <router-link
                :to="{ name: 'editPost', params: { postId: post.id } }"
              >
                <button class="btn btn-primary ms-3 edit">
                  تعديل
                  <FontAwesome
                    :icon="['fas', 'pen-to-square']"
                    class="text-white"
                  />
                </button>
              </router-link>
              <button
                @click="getData(post.id, index)"
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
                        حذف التدوينه
                      </h5>
                    </div>
                    <h4 class="modal-body">
                      هل انت متأكد من حذف التدوينه مع العلم ان البيانات سوف تمسح
                      نهائيا ؟
                    </h4>
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
                        @click="deletePost()"
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
      <jw-pagination :pageSize="10" :items="postes" @changePage="onChangePage">
      </jw-pagination>
    </div>
    <div v-if="postes.length == 0" class="message-Length">
      <h3>لا يوجد تدوينات</h3>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "posting",
  data() {
    return {
      postes: [],
      pageOfItems: [],
      value: "",
      postId: "",
      postIndex: "",
      successActive: "",
      errorActive: "",
    };
  },
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  mounted() {
    let postes = axios.get(`http://localhost:3000/posts`).then((response) => {
      this.postes = response.data;
      this.tagId = response.data.tagId;
    });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.postAddress.includes(this.value.trim().toLowerCase())
        );
      } else {
        return this.pageOfItems;
      }
    },
  },
  methods: {
    getData(postId, index) {
      this.postId = postId;
      this.postIndex = index;
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    deletePost() {
      let result = axios
        .delete(`http://localhost:3000/posts/${this.postId}`)
        .then((reponse) => {
          this.successActive = true;
          this.errorActive = false;
          setTimeout(() => {
            document.getElementById("close").click();
            this.successActive = false;
            this.postes.splice(this.postIndex, 1);
          }, 1000);
        })
        .catch((reject) => {
          this.successActive = false;
          this.errorActive = true;
        });
    },
  },
};
</script>
<style>
input {
  font-weight: bold;
}
.input-search {
  width: 40%;
}
table th,
table td {
  border: 1px solid #c6c6c6;
}
tr {
  font-size: 20px;
}
.input-search input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.search-btn {
  width: 120px;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: #e95a0c !important ;
  border: none;
  height: 38px;
}

@media (max-width: 767px) {
  .input-search {
    width: 60%;
  }
}
.taple-bg {
  background-color: #ddd;
}
.add-btn {
  width: 120px;
  background-color: #6c757d !important;
  border: none;
}
.container-border {
  border-top: 3px solid #e95a0c;
  margin-top: 30px;
  border-radius: 6px;
}
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
@media (max-width: 991px) {
  button.edit {
    margin: 10px 0px !important;
  }
}
</style>
