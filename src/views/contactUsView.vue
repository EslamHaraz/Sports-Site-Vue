<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم ارسال رسالتك بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>حدث خطأ يرجي المحاوله مره اخري</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container">
      <h1 class="heading mt-5">اتصل بنا</h1>
      <form @submit.prevent class="form-contact mt-5 mb-4">
        <div class="input-group mb-3 parent-input m-auto">
          <input
            type="text"
            class="form-control"
            placeholder="الاسم "
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            v-model.trim="name"
          />
          <span class="input-group-text group-text" id="basic-addon2">
            <FontAwesome :icon="['fas', 'user']" class="text-dark" />
          </span>
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
        <div class="input-group mb-3 parent-input m-auto">
          <input
            type="text"
            class="form-control"
            placeholder="البريد الاكتروني"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            v-model="email"
          />
          <span class="input-group-text group-text" id="basic-addon2">
            <FontAwesome :icon="['fas', 'at']" class="text-dark" />
          </span>
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
        <div class="input-group mb-3 parent-input m-auto">
          <input
            type="text"
            class="form-control"
            placeholder="عنوان الرساله"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            v-model="massageAddress"
          />
          <span class="input-group-text group-text" id="basic-addon2">
            <FontAwesome :icon="['fas', 'pen-to-square']" class="text-dark" />
          </span>
          <span v-if="this.v$.massageAddress.$error" class="error-message">
            يرجي كتابه عنوان الرساله
          </span>
        </div>
        <div class="form-floating parent-input m-auto mb-2">
          <textarea
            class=""
            placeholder="محتوي الرساله"
            id=""
            v-model="messageContent"
          ></textarea>
          <span v-if="this.v$.messageContent.$error" class="error-message">
            يرجي كتابه محتوي الرساله
          </span>
        </div>
        <button
          @click="sendMessage()"
          type="submit"
          class="btn btn-primary parent-input send-btn"
        >
          ارسال
        </button>
      </form>
    </div>
    <page-Seal></page-Seal>
  </div>
</template>
<script>
import profileNavBar from "@/components/profileNavbar/profileNavBar.vue";
import mainNavbar from "@/components/mainNavbar/mainNavbar.vue";
import pageSeal from "@/components/pageSeal/pageSeal.vue";
import useValidate from "@vuelidate/core";
import { required, email, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "contactUsView",
  setup: () => ({ v$: useValidate() }),
  components: {
    profileNavBar,
    mainNavbar,
    pageSeal,
  },
  data() {
    return {
      name: "".toLocaleLowerCase().trim(),
      email: "",
      massageAddress: "",
      messageContent: "",
      successActive: "",
      errorActive: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { email, required },
      massageAddress: { required },
      messageContent: { required, maxLength: maxLength(250) },
    };
  },
  methods: {
    sendMessage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .post(`http://localhost:3000/messages`, {
            Name: this.name,
            Email: this.email,
            massageAddress: this.massageAddress,
            messageContent: this.messageContent,
          })
          .then((response) => {
            (this.errorActive = false), (this.successActive = true);
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 2000);
          })
          .catch((reject) => {
            this.successActive = false;
            this.errorActive = true;
          });
      } else 
    },
  },
};
</script>
<style scoped>
.heading {
  font-weight: bold;
}
.form-contact {
  margin: auto;
}
.form-contact .parent-input {
  width: 70%;
}
.form-contact input,
.form-contact span {
  border-radius: 0;
}

@media (max-width: 567px) {
  .group-text {
    display: none;
  }
}
textarea {
  resize: none;
  height: 250px !important;
  width: 100%;
  border: 1px solid #ddd;
  padding: 15px;
  outline: none;
}
textarea::placeholder {
  font-size: 20px;
}
.send-btn {
  font-weight: bold;
  font-size: 20px;
}
.parent {
  background-color: white;
}
</style>
