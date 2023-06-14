<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تعديل {{ powers }} بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>هذا {{ powers }} موجود بالفعل</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4">
      <h3 class="text-end fw-bold text-white">تعديل بياناتك</h3>
      <hr />
      <div class="row justify-content-between">
        <div class="col-lg-12 border-top pt-3">
          <form @submit.prevent>
            <h4 class="text-white text-end mb-3">الاسم</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="الاسم"
                v-model="name"
              />
              <span v-if="this.v$.name.$error" class="error-message"
                >الاسم مطلوب</span
              >
              <span
                v-if="this.name.length > 1 && this.name.length < 3"
                class="error-message"
              >
                الاسم قصير</span
              >
            </div>
            <h4 class="text-white text-end mb-3">الايميل</h4>
            <div class="form-outline mb-4">
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="البريد الالكتروني"
                v-model="email"
              />
              <span v-if="this.v$.email.$error" class="error-message">
                الايميل غير صالح</span
              >
            </div>
            <h4 class="text-white text-end mb-3 mt-3">كلمه السر</h4>
            <div class="form-outline mb-4">
              <input
                type="password"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder=" كمله السر"
                v-model="password"
              />
              <span v-if="this.v$.password.$error" class="error-message">
                كلمه السر يجب ان تكون من 8 الي 15 حرف كحد اقصي</span
              >
            </div>
            <h4 class="text-white text-end mb-3 mt-3">تاكيد كلمه السر</h4>
            <div class="form-outline mb-4">
              <input
                type="password"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder=" رجي اعاده تأكيد كلمه السر"
                v-model="confirmPassword"
              />
              <span v-if="password != confirmPassword" class="error-message">
                كلمه السر غير متطابقه
              </span>
            </div>
            <h4 class="text-white text-end">صوره المشرف</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="رابط الصوره"
                v-model="adminPhoto"
              />
              <span v-if="this.v$.adminPhoto.$error" class="error-message">
                الصوره مطلويه</span
              >
            </div>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="editAdmin()"
            type="button"
            class="btn btn-dark btn-submit"
          >
            تعديل الان
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import { VueEditor } from "vue2-editor";
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  url,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "adminProfileView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      adminId: this.$route.params.adminId,
      name: "".toLocaleLowerCase(),
      email: "",
      password: "",
      confirmPassword: "",
      adminPhoto: "",
      powers: "",
      successActive: "",
      errorActive: "",
    };
  },
  components: {
    dashboardNavbar,
    routersNavbar,
    VueEditor,
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8), maxLength: maxLength(15) },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15),
      },
      adminPhoto: { required, url },
    };
  },
  mounted() {
    let adminInfo = window.localStorage.getItem(`admin-info`);
    if (adminInfo) {
      this.adminId = JSON.parse(adminInfo).id;
      this.name = JSON.parse(adminInfo).adminName;
      this.email = JSON.parse(adminInfo).adminEmail;
      this.adminPhoto = JSON.parse(adminInfo).adminPhoto;
      this.powers = JSON.parse(adminInfo).supervisorStatus;
      console.log(this.powers);
    }
  },
  methods: {
    editAdmin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let admin = axios
          .get(
            `http://localhost:3000/admins?adminName=${this.name}&adminEmail=${this.email}`
          )
          .then((response) => {
            if (response.data.length < 1) {
              let result = axios
                .put(`http://localhost:3000/admins/${this.adminId}`, {
                  adminName: this.name,
                  adminEmail: this.email,
                  adminPassword: this.password,
                  supervisorStatus: this.powers,
                  adminPhoto: this.adminPhoto,
                })
                .then((response) => {
                  this.errorActive = false;
                  this.successActive = true;
                  window.localStorage.setItem(
                    `admin-info`,
                    JSON.stringify(response.data)
                  );
                  setTimeout(() => {
                    this.$router.push({ name: "adminsView" });
                  }, 2000);
                });
            } else this.errorActive = true;
          });
      }
    },
  },
};
</script>
<style scoped>
.parent {
  background-color: var(--section-Color);
}
</style>
