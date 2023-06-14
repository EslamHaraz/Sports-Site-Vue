<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم اضافه {{ powers }} بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>هذا الادمن موجود بالفعل</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4">
      <h3 class="text-end fw-bold text-white">اضافه مشرف</h3>
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
                placeholder="كمله السر"
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
                placeholder=" يرجي اعاده كتابه كلمه السر"
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
            </div>
            <span v-if="this.v$.adminPhoto.$error" class="error-message">
              الصوره مطلويه</span
            >
            <h4 class="text-white text-end mb-3 mt-3">الصلاحيات</h4>
            <select
              v-model="powers"
              class="form-select mb-3"
              aria-label="Default select example"
            >
              <option value="Admin" selected>ادمن</option>
              <option value="superAdmin">سوبر ادمين</option>
            </select>
            <span v-if="this.v$.powers.$error" class="error-message">
              يرجي تحديد الصلاحيه
            </span>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="addAdmin()"
            type="button"
            class="btn btn-dark btn-submit"
          >
            اضافه الان
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
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
  name: "addAdmin",
  components: {
    dashboardNavbar,
    routersNavbar,
  },
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
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
      powers: { required },
    };
  },
  methods: {
    addAdmin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .get(
            `http://localhost:3000/admins?adminName=${this.name}&adminEmail=${this.email}`
          )
          .then((response) => {
            if (response.data.length > 0) {
              this.errorActive = true;
              this.successActive = false;
            } else {
              let result = axios
                .post(`http://localhost:3000/admins`, {
                  adminName: this.name,
                  adminEmail: this.email,
                  adminPassword: this.password,
                  supervisorStatus: this.powers,
                  adminPhoto: this.adminPhoto,
                })
                .then((response) => {
                  this.successActive = true;
                  this.errorActive = false;
                  setTimeout(() => {
                    this.$router.push({ name: "adminsView" });
                  }, 2000);
                });
            }
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
