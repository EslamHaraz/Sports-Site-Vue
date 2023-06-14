<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تعديل الصفحه بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>حدث خطأ 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4">
      <h3 class="text-end fw-bold text-white letter-space">الاعدادات</h3>
      <hr />
      <div class="row justify-content-between">
        <div class="col-lg-12 border-top pt-3">
          <form @submit.prevent>
            <h4 class="text-white text-end mb-3">اسم الموقع</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="الاسم"
                v-model="siteName"
              />
              <span v-if="this.v$.siteName.$error" class="error-message"
                >الاسم مطلوب</span
              >
              <span
                v-if="this.siteName.length < 7 && this.siteName.length > 10"
                class="error-message"
              >
                الاسم قصير</span
              >
              <span v-if="this.siteName.length > 20" class="error-message">
                الاسم كبير جدا اقصي حد 20 حرف</span
              >
            </div>
            <h4 class="text-white text-end mb-3">ايقونه الموقع</h4>
            <div class="form-outline mb-4">
              <input
                type="url"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder=" رابط الصوره"
                v-model="siteIcon"
              />
              <strong class="text-white mt-2 text-end w-100 d-block"
                >يجب ان تكون الصوره صغيره</strong
              >
              <span v-if="this.v$.siteIcon.$error" class="error-message">
                الصوره مطلويه</span
              >
            </div>
            <h4 class="text-white text-end mb-3 mt-3">لوجو الموقع</h4>
            <div class="form-outline mb-4">
              <input
                type="url"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder=" رابط الصوره"
                v-model="siteLogo"
              />
              <strong class="text-white mt-2 text-end w-100 d-block"
                >يجب ان تكون الصوره صغيره</strong
              >
              <span v-if="this.v$.siteLogo.$error" class="error-message">
                الصوره مطلويه</span
              >
            </div>
            <h4 class="text-white text-end mb-3 mt-3">وصف الموقع</h4>
            <div class="form-outline">
              <textarea
                class="form-control"
                rows="4"
                placeholder="وصف"
                v-model="siteDescription"
              ></textarea>
              <span v-if="this.v$.siteDescription.$error" class="error-message">
                الوصف مطلوب</span
              >
              <span
                v-if="
                  this.siteDescription.length < 50 &&
                  this.siteDescription.length > 10
                "
                class="error-message"
              >
                الوصف قصير حدادني 50 حرف</span
              >
              <span
                v-if="this.siteDescription.length > 160"
                class="error-message"
              >
                الوصف كبير جدا اقصي حد 160 حرف فقط</span
              >
            </div>

            <h4 class="text-white text-end mb-3 mt-3">حاله الموقع</h4>
            <select
              class="form-select mb-3"
              aria-label="Default select example"
              v-model="siteStatus"
            >
              <option value="open" selected>مفتوح</option>
              <option value="closed">مغلق</option>
            </select>
            <span v-if="this.v$.siteStatus.$error" class="error-message">
              الحاله مطلويه</span
            >
            <h4 class="text-white text-end mb-3 mt-3">نص بديل</h4>
            <div class="form-outline mb-4">
              <textarea
                class="form-control"
                rows="4"
                placeholder="نص"
                v-model="altText"
              ></textarea>
              <span v-if="this.v$.altText.$error" class="error-message">
                النص البديل مطلوب</span
              >
              <span
                v-if="this.altText.length < 50 && this.altText.length > 10"
                class="error-message"
              >
                النص قصير حدادني 50 حرف</span
              >
              <span v-if="this.altText.length > 160" class="error-message">
                النص كبير جدا اقصي حد 160 حرف فقط</span
              >
            </div>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="editSetting()"
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
import useValidate from "@vuelidate/core";
import { mapState } from "vuex";
import {
  required,
  email,
  url,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "settingView",
  setup: () => ({ v$: useValidate() }),
  components: {
    dashboardNavbar,
    routersNavbar,
  },
  data() {
    return {
      siteName: "",
      siteIcon: "",
      siteLogo: "",
      siteDescription: "",
      siteStatus: "",
      altText: "",
      errorActive: "",
      successActive: "",
      superAdmin: "",
    };
  },
  mounted() {
    let superAdmin = window.localStorage.getItem("admin-info");
    this.superAdmin = JSON.parse(superAdmin).supervisorStatus;
    if (this.superAdmin != "superAdmin") {
      this.$router.push({ name: "dashboardView" });
    }
    let result = axios
      .get(`http://localhost:3000/settingPage/1`)
      .then((response) => {
        this.siteName = response.data.siteName;
        this.siteIcon = response.data.siteIcon;
        this.siteLogo = response.data.siteLogo;
        this.siteDescription = response.data.siteDescription;
        this.siteStatus = response.data.siteStatus;
        this.altText = response.data.altText;
      });
  },
  validations() {
    return {
      siteName: { required, minLength: minLength(7), maxLength: maxLength(20) },
      siteIcon: { required, url },
      siteLogo: { required, url },
      siteDescription: {
        required,
        minLength: minLength(50),
        maxLength: maxLength(160),
      },
      siteStatus: { required },
      altText: { required, maxLength: maxLength(160) },
    };
  },
  methods: {
    editSiteSettings() {
      this.$store.commit("getsiteData", {
        siteName: this.siteName,
        siteLogo: this.siteLogo,
        siteIcon: this.siteIcon,
      });
    },
    editSetting() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .put(`http://localhost:3000/settingPage/1`, {
            siteName: this.siteName,
            siteIcon: this.siteIcon,
            siteLogo: this.siteLogo,
            siteDescription: this.siteDescription,
            siteStatus: this.siteStatus,
            altText: this.altText,
          })
          .then((respone) => {
            this.editSiteSettings();
            this.errorActive = false;
            this.successActive = true;
            setTimeout(() => {
              this.$router.push({ name: "dashboardView" });
            }, 2000);
          })
          .catch((reject) => {
            this.errorActive = true;
            this.successActive = false;
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
.letter-space {
  letter-spacing: 2px;
}
.successMessage {
  top: 65px !important;
}
</style>
