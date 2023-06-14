<template>
  <div
    class="container container-form d-flex align-items-center position-relative"
  >
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تعديل الحساب بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>حدث خطا 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <form @submit.prevent class="m-auto form">
      <h3 class="mb-5 head">تعديل الملف الشخصي</h3>
      <div class="mb-3">
        <img :src="userPhoto" class="img-fluid mt-3" />
      </div>
      <div class="form-group mb-3 fw-bold position-relative">
        <input
          type="url"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="رابط الصوره الشخصيه"
          v-model="newphotoUser"
        />
        <FontAwesome :icon="['fas', 'image']" class="text-dark icon-posation" />
        <span v-if="this.v$.newphotoUser.$error" class="error-message">
          الصوره مطلويه</span
        >
      </div>
      <div class="form-group mb-4 position-relative">
        <input
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="الاسم"
          v-model="name"
        />
        <FontAwesome
          :icon="['fas', 'envelope']"
          class="text-dark icon-posation"
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
      <div class="form-group mb-4 position-relative">
        <input
          type="  email"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="عنوان البريد الالكتروني"
          v-model="email"
        />
        <FontAwesome
          :icon="['fas', 'envelope']"
          class="text-dark icon-posation"
        />
        <span v-if="this.v$.email.$error" class="error-message"
          >عنوان البريد الالكتروني غير صالح</span
        >
      </div>

      <div class="form-group mb-4 position-relative">
        <input
          type="number"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="رقم الهاتف"
          v-model="phone"
        />
        <FontAwesome :icon="['fas', 'phone']" class="text-dark icon-posation" />
        <span v-if="this.v$.phone.$error" class="error-message"
          >يرجي كتابه رقم هاتف صحيح</span
        >
        <span
          v-if="this.phone.length > 1 && this.phone.length < 11"
          class="error-message"
        >
          رقم الهاتف قصير
        </span>
      </div>
      <div class="form-group mb-4 position-relative">
        <input
          type="  password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="كلمه المرور "
          v-model="password"
        />
        <FontAwesome :icon="['fas', 'lock']" class="text-dark icon-posation" />
        <span v-if="this.v$.password.$error" class="error-message">
          كلمه السر يجب ان تكون من 8 الي 15 حرف كحد اقصي</span
        >
      </div>
      <div class="form-group mb-4 position-relative">
        <input
          type="  password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder=" تأكيد كلمه المرور "
          v-model="confirmPassword"
        />
        <FontAwesome :icon="['fas', 'lock']" class="text-dark icon-posation" />
        <span class="error-message"> {{ mismatchPassword }}</span>
      </div>
      <button
        @click="editProfile()"
        type="submit"
        class="btn btn-primary submit w-100"
      >
        حفظ التغيرات
      </button>
    </form>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  number,
  url,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "profileView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      userPhoto: "",
      newphotoUser: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      name: "",
      mismatchPassword: "",
      userId: "",
      successActive: "",
      errorActive: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { email, required },
      newphotoUser: { url, required },
      password: { required, minLength: minLength(8), maxLength: maxLength(15) },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15),
      },
      phone: { required },
    };
  },
  mounted() {
    let user = window.localStorage.getItem("user-data");
    if (user) {
      this.userPhoto = JSON.parse(user).userPhoto;
      this.email = JSON.parse(user).Email;
      this.phone = JSON.parse(user).Phone;
      this.name = JSON.parse(user).Name;
      this.userId = JSON.parse(user).id;
    }
  },
  methods: {
    editProfile() {
      this.v$.$validate();
      if (this.confirmPassword != this.password) {
        this.mismatchPassword = "كلمتان السر غير متطابقان";
      } else {
        if (!this.v$.$error) {
          let result = axios
            .put(`http://localhost:3000/users/${this.userId}`, {
              Name: this.name.toLowerCase(),
              Email: this.email,
              Password: this.password,
              Phone: this.phone,
              status: "Good",
              userPhoto: this.newphotoUser,
            })
            .then((response) => {
              this.successActive = true;
              window.localStorage.setItem(
                `user-data`,
                JSON.stringify(response.data)
              );
              setTimeout(() => {
                this.$router.push({ name: "home" });
              }, 2000);
            });
        }
      }
    },
  },
};
</script>
<style scoped>
img {
  width: 35%;
  border-radius: 5px;
}
</style>
