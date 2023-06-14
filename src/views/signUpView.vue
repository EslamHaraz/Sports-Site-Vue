<template>
  <div
    class="container container-form d-flex align-items-center position-relative"
  >
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم اضافه الحساب بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>الحساب موجود بالفعل</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <form @submit.prevent class="m-auto form">
      <h3 class="mb-5 head">انشاء حساب</h3>
      <div class="form-group mb-4 position-relative">
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder=" ادخل اسمك"
          v-model.trim="name"
        />
        <FontAwesome :icon="['fas', 'user']" class="text-dark icon-posation" />
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
      <div class="form-group mb-3 fw-bold position-relative">
        <input
          type="url"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="رابط الصوره الشخصيه"
          v-model="photoLink"
        />
        <FontAwesome :icon="['fas', 'image']" class="text-dark icon-posation" />
        <span v-if="this.v$.photoLink.$error" class="error-message">
          الصوره مطلويه</span
        >
      </div>
      <div class="form-group mb-4 position-relative">
        <input
          type="email"
          class="form-control"
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
          placeholder="رقم الهاتف"
          v-model.trim="phone"
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
          type="password"
          class="form-control"
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
          type="password"
          class="form-control"
          placeholder=" تأكيد كلمه المرور "
          v-model="confirmPassword"
        />
        <FontAwesome :icon="['fas', 'lock']" class="text-dark icon-posation" />
        <span class="error-message"> {{ mismatchPassword }}</span>
      </div>
      <button
        @click="createAccount()"
        type="button"
        class="btn btn-primary submit"
      >
        انشاء الحساب
      </button>
      <router-link :to="{ name: 'loginView' }">
        <button class="btn sign-button submit me-4">
          العوده الي تسجيل الدخول
        </button>
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
  name: "signUpComp",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      name: "".toLocaleLowerCase(),
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      mismatchPassword: "",
      errorMessage: "",
      photoLink: "",
      successActive: false,
      errorActive: false,
    };
  },
  validations() {
    return {
      name: { required },
      email: { email, required },
      photoLink: { url, required },
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
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    async createAccount() {
      this.v$.$validate();
      if (this.confirmPassword != this.password) {
        this.mismatchPassword = "كلمتان السر غير متطابقان";
      } else {
        this.mismatchPassword = "";
        let result = await axios.get(
          `http://localhost:3000/users?Name=${this.name}&Email=${this.email}`
        );
        if (result.status == 200 && result.data.length < 1) {
          this.errorActive = false;
          this.successActive = false;
          if (!this.v$.$error) {
            let result = await axios
              .post(`http://localhost:3000/users`, {
                Name: this.name.toLowerCase(),
                Email: this.email,
                Password: this.password,
                Phone: this.phone,
                status: "Good",
                userPhoto: this.photoLink,
              })
              .then((response) => {
                this.successActive = true;
                this.errorActive = false;
                window.localStorage.setItem(
                  "user-data",
                  JSON.stringify(response.data)
                );
                setTimeout(() => {
                  this.$router.push({ name: "home" });
                }, 2000);
              })
              .catch((reject) => {
                this.errorMessage = "Error 404";
              });
          }
        } else {
          this.errorActive = true;
        }
      }
    },
  },
};
</script>

<style>
.head {
  font-weight: 700;
}
.submit {
  font-size: 20px;
}
.sign-button {
  background-color: var(--main-Color) !important;
  color: white !important;
}
.sign-button:hover {
  background-color: var(--main-Color);
  color: white;
}
.container-form {
  height: 100vh;
}
.form {
  width: 450px;
  padding: 25px;
  background-color: #faf9f9;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
input::placeholder {
  font-size: 20px;
}
.icon-posation {
  position: absolute;
  top: 12px;
  left: 15px;
}
</style>
