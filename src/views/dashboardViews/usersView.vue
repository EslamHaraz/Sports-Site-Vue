<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>{{ Message }}</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>حدث خطأ 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">المستخدمين</h3>
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
            <th scope="col" class="resize-width">المستخدم</th>
            <th class="td-display" scope="col">البريد الالكتروني</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in search" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td class="d-flex justify-content-evenly align-items-center">
              <img :src="user.userPhoto" class="img-fluid custmoize-img" />
              <p class="mb-0 user-name">
                {{ user.Name }}
              </p>
            </td>
            <td class="vertical-middle td-display">{{ user.Email }}</td>
            <td class="vertical-middle">
              <button
                v-if="user.status === 'Good'"
                @click="getId(user.id, user, index)"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                حظر
                <FontAwesome
                  :icon="['fas', 'user-lock']"
                  class="text-white me-2"
                />
              </button>
              <button
                v-if="user.status === 'Blocked'"
                @click="getId(user.id, user, index)"
                class="btn btn-danger me-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                الغاء الحظر
                <FontAwesome
                  :icon="['fas', 'unlock']"
                  class="text-white me-2"
                />
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
                        حظر المستخدم
                      </h5>
                    </div>
                    <h4 class="modal-body">
                      هل انت متأكد من حظر هذا المستخدم ؟
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
                        @click="blockUser()"
                        type="button"
                        class="btn btn-danger"
                      >
                        حظر الان
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="modal fade"
                id="exampleModal2"
                tabindex="-1"
                aria-labelledby="exampleModalLabel2"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel2">
                        حظر المستخدم
                      </h5>
                    </div>
                    <h4 class="modal-body">
                      هل انت متأكد من فك حظر هذا المستخدم ؟
                    </h4>
                    <div class="modal-footer">
                      <button
                        id="closed"
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        الغاء
                      </button>
                      <button
                        @click="unblockUser()"
                        type="button"
                        class="btn btn-danger"
                      >
                        الغاء الحظر الان
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <jw-pagination :pageSize="10" :items="users" @changePage="onChangePage">
      </jw-pagination>
    </div>
    <div v-if="users.length == 0" class="message-Length">
      <h3>لا يوجد مستخدمين</h3>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import JwPagination from "jw-vue-pagination";
import axios from "axios";
export default {
  name: "usersView",
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  data() {
    return {
      pageOfItems: [],
      users: [],
      superAdmin: "",
      successActive: "",
      errorActive: "",
      userId: "",
      index: "",
      value: "",
      Message: "",
    };
  },
  mounted() {
    let superAdmin = window.localStorage.getItem("admin-info");
    this.superAdmin = JSON.parse(superAdmin).supervisorStatus;
    if (this.superAdmin != "superAdmin") {
      this.$router.push({ name: "dashboardView" });
    }
    let users = axios.get(`http://localhost:3000/users`).then((response) => {
      this.users = response.data;
    });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.Name.includes(this.value.trim().toLowerCase())
        );
      } else {
        return this.pageOfItems;
      }
    },
  },
  methods: {
    getId(id, user, index) {
      this.userId = id;
      this.user = user;
      this.index = index;
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    blockUser() {
      let result = axios
        .put(`http://localhost:3000/users/${this.userId}`, {
          Name: this.user.Name,
          Email: this.user.Email,
          Password: this.user.Password,
          Phone: this.user.Phone,
          status: "Blocked",
          userPhoto: this.user.userPhoto,
        })
        .then((response) => {
          let result = axios
            .post(`http://localhost:3000/replytoUsers`, {
              Message: "لقد تم حظرك",
              userId: this.userId,
            })
            .then((response) => {
              this.Message = "تم حظر المستخدم بنجاح";
              this.successActive = true;
              this.errorActive = false;
              document.getElementById("close").click();
              setTimeout(() => {
                this.successActive = false;
                this.users[this.index].status = "Blocked";
              }, 1000);
            });
        })
        .catch((reject) => {
          this.successActive = false;
          this.errorActive = true;
        });
    },
    unblockUser() {
      let result = axios
        .put(`http://localhost:3000/users/${this.userId}`, {
          Name: this.user.Name,
          Email: this.user.Email,
          Password: this.user.Password,
          Phone: this.user.Phone,
          status: "Good",
          userPhoto: this.user.userPhoto,
        })
        .then((response) => {
          let result = axios
            .post(`http://localhost:3000/replytoUsers`, {
              Message: "لقد تم الغاء حظرك",
              userId: this.userId,
            })
            .then((response) => {
              this.Message = "تم الغاء حظر المستخدم بنجاح";
              this.successActive = true;
              this.errorActive = false;
              document.getElementById("closed").click();
              setTimeout(() => {
                this.successActive = false;
                this.users[this.index].status = "Good";
              }, 1000);
            });
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
.custmoize-img {
  width: 70px;
  border-radius: 5px;
  height: 80px;
}
.resize-width {
  width: 300px;
}
.vertical-middle {
  vertical-align: middle;
}
.user-name {
  width: 90px;
}
#exampleModal2 {
  z-index: 50000000000000;
}
</style>
