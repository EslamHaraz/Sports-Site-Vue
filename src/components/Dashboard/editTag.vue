<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تعديل الوسم بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>هذا الوسم موجود بالفعل</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4">
      <h3 class="text-end fw-bold text-white">تعديل الوسم</h3>
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
              <span v-if="this.v$.name.$error" class="error-message">
                البيانات مطلوبه</span
              >
            </div>
            <h4 class="text-white text-end mb-3">الاسم الطيف</h4>
            <div class="form-outline mb-4">
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="البريد الالكتروني"
                v-model="spectrumName"
              />
              <span v-if="this.v$.spectrumName.$error" class="error-message">
                البيانات مطلوبه</span
              >
            </div>
                     <h4 class="text-white text-end">صوره الوسم</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="رابط الصوره"
                v-model="tagPhoto"
              />
                            <span v-if="this.v$.tagPhoto.$error" class="error-message">
                الصوره مطلوبه</span
              >
            </div>
            <h4 class="text-white text-end mb-3">نبذه</h4>
            <div class="form-outline mb-3">
              <textarea
                class="form-control"
                id="textAreaExample1"
                rows="4"
                placeholder="يجب ان يكون الوصف قصير كحد اقصي 25 حرف"
                v-model="brief"
              ></textarea>
              <span v-if="this.v$.brief.$error" class="error-message">
                البيانات مطلوبه</span
              >
              <span v-if="this.brief.length > 31" class="error-message">
                الوصف كبير بجب ان يكون مكون من 30 حرف</span
              >
            </div>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="editTag()"
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
import { required, maxLength,url } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "editTag",
  components: {
    dashboardNavbar,
    routersNavbar,
  },
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      tagId: this.$route.params.tagId,
      name: "",
      spectrumName: "",
      brief: "",
      successActive: "",
      errorActive: "",
      tagDetail: [],
      tagPhoto:"",
    };
  },
  validations() {
    return {
      name: { required },
      spectrumName: { required },
      tagPhoto: { required,url },
      brief: { required, maxLength: maxLength(31) },
    };
  },
  async mounted() {
    let tag = axios
      .get(`http://localhost:3000/tags/${this.tagId}`)
      .then((response) => {
        this.name = response.data.tagName;
        this.spectrumName = response.data.spectrumName;
        this.brief = response.data.breif;
        this.tagPhoto = response.data.tagPhoto;
      });
  },
  methods: {
    editTag() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let tag = axios
          .get(
            `http://localhost:3000/tags?tagName=${this.name}&spectrumName=${this.spectrumName}`
          )
          .then((response) => {
            if (response.data.length < 1) {
              this.successActive = false;
              this.errorActive = true;
              let result = axios
                .put(`http://localhost:3000/tags/${this.tagId}`, {
                  tagName: this.name,
                  spectrumName: this.spectrumName,
                  breif: this.brief,
                  tagPhoto : this.tagPhoto
                })
                .then((response) => {
                  this.successActive = true;
                  this.errorActive = false;
                  setTimeout(() => {
                    this.$router.push({ name: "tagsView" });
                  }, 2000);
                });
            } else {
              this.errorActive = true;
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
