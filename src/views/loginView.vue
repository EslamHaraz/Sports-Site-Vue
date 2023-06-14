<template>
  <div
    class="container container-form d-flex align-items-center position-relative"
  >
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تسجيل الدخول بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>البيانات خاظئه</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <form @submit.prevent class="m-auto form">
      <h3 class="mb-5 head">تسجيل دخول</h3>
      <div class="form-group mb-4 position-relative">
        <input
          type="  email"
          class="form-control"
          placeholder="عنوان البريد الالكتروني"
          v-model.trim="email"
        />
        <FontAwesome
          :icon="['fas', 'envelope']"
          class="text-dark icon-posation"
        />
        <span v-if="this.v$.email.$error" class="error-message">
          يرجي كتابه البيانات الصحيحه</span
        >
      </div>

      <div class="form-group mb-4 position-relative">
        <input
          type="password"
          class="form-control"
          placeholder="كلمه المرور "
          v-model.trim="password"
        />
        <FontAwesome :icon="['fas', 'lock']" class="text-dark icon-posation" />
        <span v-if="this.v$.email.$error" class="error-message">
          يرجي كتابه البيانات الصحيحه</span
        >
      </div>

      <button @click="login()" type="submit" class="btn btn-primary submit">
        تسجيل دخول
      </button>
      <router-link :to="{ name: 'signUpView' }">
        <button class="btn sign-button submit me-4">انشاء حساب</button>
      </router-link>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  number,
  url,
} from "vuelidate/lib/validators";
export default {
  name: "loginView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      email: "",
      password: "",
      successActive: "",
      errorActive: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  mounted() {
    let user = window.localStorage.getItem("user-data");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .get(
            `http://localhost:3000/users?Email=${this.email}&Password=${this.password}`
          )
          .then((response) => {
            response.data.length > 0
              ? ((this.successActive = true),
                (this.errorActive = false),
                setTimeout(() => {
                  this.$router.push({ name: "home" });
                }, 2000),
                window.localStorage.setItem(
                  "user-data",
                  JSON.stringify(response.data[0])
                ))
              : ((this.successActive = false), (this.errorActive = true));
          });
      } 
    },
  },
};
</script>
