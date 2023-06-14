<template>
  <div
    class="container container-form d-flex align-items-center position-relative"
  >
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تسجيل الدخول بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>البيانات خاطئه</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <form @submit.prevent class="m-auto form">
      <h3 class="mb-5 head">تسجيل دخول</h3>
      <div class="form-group mb-4 position-relative">
        <input
          type="  email"
          class="form-control"
          placeholder="عنوان البريد الالكتروني"
          v-model="email"
        />
        <FontAwesome
          :icon="['fas', 'envelope']"
          class="text-dark icon-posation"
        />

        <span
          v-if="this.email.length == 0 && this.v$.email.$error"
          class="error-message"
        >
          يرجي كتابه البريد الالكتروني</span
        >
        <span
          v-if="this.v$.email.$error && this.email.length > 1"
          class="error-message"
        >
          البريد الالكتروني غير صالح</span
        >
      </div>

      <div class="form-group mb-4 position-relative">
        <input
          type="password"
          class="form-control"
          placeholder="كلمه المرور "
          v-model="password"
        />
        <span v-if="this.v$.password.$error" class="error-message">
          يرجي كتابه كلمه السر
        </span>
        <span
          v-if="this.password.length > 1 && this.password.length < 8"
          class="error-message"
        >
          كلمه السر قصيره
        </span>
        <FontAwesome :icon="['fas', 'lock']" class="text-dark icon-posation" />
      </div>

      <button
        @click="login()"
        type="submit"
        class="btn btn-primary submit w-100"
      >
        تسجيل دخول
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "adminLogin",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      email: "",
      password: "",
      successActive: "",
      errorActive: "",
    };
  },
  mounted() {
    let admin = window.localStorage.getItem("admin-info");
    if (admin) {
      this.$router.push({ name: "dashboardView" });
    }
  },
  validations() {
    return {
      email: { email, required },
      password: { required },
    };
  },
  methods: {
    login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .get(
            `http://localhost:3000/admins?adminEmail=${this.email}&adminPassword=${this.password}`
          )
          .then((response) => {
            response.data.length > 0
              ? ((this.successActive = true),
                (this.errorActive = false),
                console.log(response.data),
                setTimeout(() => {
                  this.$router.push({ name: "dashboardView" });
                }, 2000),
                window.localStorage.setItem(
                  "admin-info",
                  JSON.stringify(response.data[0])
                ))
              : ((this.successActive = false), (this.errorActive = true));
          });
      }
    },
  },
};
</script>
<style scoped>

</style>
