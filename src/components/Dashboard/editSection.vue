<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تعديل القسم بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>هذا القسم موجود بالفعل</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4">
      <h3 class="text-end fw-bold text-white">تعديل القسم</h3>
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
                placeholder=" الاسم الطيف"
                v-model="spectrumName"
              />
              <span v-if="this.v$.spectrumName.$error" class="error-message">
                البيانات مطلوبه</span
              >
            </div>
            <h4 class="text-white text-end mb-3">الصوره الرئيسيه</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="url"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="رابط الصوره"
                v-model="sectionPhoto"
              />
              <span v-if="this.v$.sectionPhoto.$error" class="error-message">
                يجب عليك وضع لينك صوره القسم</span
              >
              <span
                v-if="
                  this.sectionPhoto.length > 1 && this.sectionPhoto.length < 50
                "
                class="error-message"
              >
                يرجي كتابه رابط صحيح</span
              >
            </div>
            <h4 class="text-white text-end mb-3">نبذه</h4>
            <div class="form-outline mb-3">
              <textarea
                class="form-control"
                id="textAreaExample1"
                rows="4"
                placeholder="يجب ان يكون الوصف قصير كحد اقصي 30 حرف"
                v-model="brief"
              ></textarea>
              <span v-if="this.v$.brief.$error" class="error-message">
                البيانات مطلوبه</span
              >
              <span v-if="this.brief.length > 80" class="error-message">
                الوصف كبير بجب ان يكون مكون من 80 حرف</span
              >
            </div>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="editSection()"
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
import useValidate from "@vuelidate/core";
import { required, maxLength, url } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "editSection",
  components: {
    dashboardNavbar,
    routersNavbar,
    VueEditor,
  },
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      name: "",
      spectrumName: "",
      brief: "",
      successActive: "",
      errorActive: "",
      sectionId: this.$route.params.sectionId,
      sectionPhoto: "",
    };
  },
  validations() {
    return {
      name: { required },
      spectrumName: { required },
      brief: { required, maxLength: maxLength(80) },
      sectionPhoto: { required, url },
    };
  },
  mounted() {
    let section = axios
      .get(`http://localhost:3000/sections/${this.sectionId}`)
      .then((response) => {
        this.name = response.data.sectionName;
        this.spectrumName = response.data.spectrumName;
        this.brief = response.data.breif;
      });
  },
  methods: {
    editSection() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let section = axios
          .get(
            `http://localhost:3000/sections?sectionName=${this.name}&spectrumName=${this.spectrumName}&breif=${this.brief}`
          )
          .then((response) => {
            if (response.data.length > 0) {
              this.errorActive = true;
              this.successActive = false;
            } else {
              let result = axios
                .put(`http://localhost:3000/sections/${this.sectionId}`, {
                  sectionName: this.name,
                  spectrumName: this.spectrumName,
                  breif: this.brief,
                  sectionPhoto: this.sectionPhoto,
                })
                .then((response) => {
                  this.successActive = true;
                  this.errorActive = false;
                  setTimeout(() => {
                    this.$router.push({ name: "sectionsView" });
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
