<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم حذف الادمن بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>Error 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">المشرفين</h3>
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
        <router-link :to="{ name: 'addAdmin' }">
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
            <th scope="col">المشرف</th>
            <th class="td-display" scope="col">البريد الالكتروني</th>
            <th class="td-display" scope="col">الصفه</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(admin, index) in search"
            :key="index"
            v-if="admin.id !== adminId"
          >
            <th class="td-display" scope="row">{{ index + 1 }}</th>
            <td class="d-flex justify-content-evenly align-items-center">
              <img :src="admin.adminPhoto" class="img-fluid custmoize-img" />
              <img
                v-if="!admin.adminPhoto"
                src="https://cdn.landesa.org/wp-content/uploads/default-user-image.pngo"
                class="img-fluid custmoize-img"
              />
              <p class="mb-0 user-name">
                {{ admin.adminName }}
              </p>
            </td>
            <td class="vertical-middle td-display">{{ admin.adminEmail }}</td>
            <td class="vertical-middle td-display">
              {{ admin.supervisorStatus }}
            </td>
            <td class="vertical-middle">
              <router-link
                :to="{ name: 'editAdmin', params: { adminId: admin.id } }"
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
                @click="getData(admin.id, index)"
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
                        حذف المشرف
                      </h5>
                    </div>
                    <h4 class="modal-body">هل انت متأكد من حذف المشرف ؟</h4>
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
                        @click="deleteAdmin()"
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
      <jw-pagination :pageSize="10" :items="admins" @changePage="onChangePage">
      </jw-pagination>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import JwPagination from "jw-vue-pagination";
import axios from "axios";
export default {
  name: "adminsView",
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  data() {
    return {
      pageOfItems: [],
      admins: [],
      adminStatus: "",
      value: "",
      successActive: false,
      errorActive: false,
      adminId: "",
      adminIndex: "",
      adminId: "",
    };
  },
  mounted() {
    let superAdmin = window.localStorage.getItem("admin-info");
    this.superAdmin = JSON.parse(superAdmin).supervisorStatus;
    this.adminId = JSON.parse(superAdmin).id;

    if (this.superAdmin != "superAdmin") {
      this.$router.push({ name: "dashboardView" });
    }
    let result = axios.get(`http://localhost:3000/admins`).then((response) => {
      this.admins = response.data;
    });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.adminName.includes(this.value.trim().toLowerCase())
        );
      } else {
        return this.pageOfItems;
      }
    },
  },
  methods: {
    getData(adminId, index) {
      this.adminId = adminId;
      this.adminIndex = index;
      console.log(this.adminId);
      console.log(this.adminIndex);
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    deleteAdmin() {
      let result = axios
        .delete(`http://localhost:3000/admins/${this.adminId}`)
        .then((reponse) => {
          this.successActive = true;
          this.errorActive = false;
          setTimeout(() => {
            document.getElementById("close").click();
            this.successActive = false;
            this.admins.splice(this.adminIndex, 1);
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
.user-name {
  font-size: 15px;
}
@media (max-width: 567px) {
  .user-name {
    width: 100%;
  }
}
</style>
