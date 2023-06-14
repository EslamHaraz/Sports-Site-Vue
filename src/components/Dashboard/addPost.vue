<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم اضافه التدوينه بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>يوجد خطأ في البيانات</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4">
      <h3 class="text-end fw-bold text-white">اضافه تدوينه</h3>
      <hr />
      <h4 class="text-white text-end">العنوان</h4>
      <div class="form-group mb-3 fw-bold">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="عنوان التدوينه"
          v-model="postAddress"
        />
        <span v-if="this.v$.postAddress.$error" class="error-message"
          >العنوان مطلوب</span
        >
        <span
          v-if="this.postAddress.length > 1 && this.postAddress.length < 3"
          class="error-message"
        >
          العنوان قصير</span
        >
      </div>
      <div class="row justify-content-between">
        <div class="col-lg-7 parent-editor border-top pt-3">
          <form class="editor">
            <vue-editor
              placeholder="محتوي التدوينه"
              v-model="content"
              class="edit"
            ></vue-editor>
            <span v-if="this.v$.content.$error" class="error-message"
              >المحتوي مطلوب</span
            >
            <span
              v-if="this.content.length > 20 && this.content.length < 40"
              class="error-message"
            >
              المحتوي قصير</span
            >
          </form>
        </div>
        <div class="col-lg-4 border-top pt-3">
          <form @submit.prevent>
            <h4 class="text-white text-end mb-3">الصوره الرئيسيه</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="url"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="رابط الصوره"
                v-model="postPhoto"
              />
              <span v-if="this.v$.postPhoto.$error" class="error-message">
                يجب عليك وضع لينك صوره التدوينه</span
              >
              <span
                v-if="this.postPhoto.length > 1 && this.postPhoto.length < 50"
                class="error-message"
              >
                يرجي كتابه رابط صحيح</span
              >
            </div>
            <h4 class="text-white text-end mb-3">نبذه</h4>
            <div class="form-outline">
              <textarea
                class="form-control"
                id="textAreaExample1"
                rows="4"
                placeholder="وصف لايزيد عن 160 حرف"
                v-model="brief"
              ></textarea>
              <span
                v-if="this.v$.brief.$error && this.brief.length == 0"
                class="error-message"
                >النبذه مطلوبه</span
              >
              <span
                v-if="this.brief.length > 1 && this.brief.length < 40"
                class="error-message"
              >
                علي الاقل يجب كتابه 40 حرف</span
              >
            </div>
            <h4 class="text-white text-end mb-3 mt-3">الوسم</h4>
            <select
              v-model="tag"
              class="form-select"
              aria-label="Default select example"
            >
              <option :value="tag.id" v-for="(tag, index) in tags" :key="index">
                {{ tag.tagName }}
              </option>
            </select>
            <h4 class="text-white text-end mb-3 mt-3">القسم</h4>
            <select
              v-model="section"
              class="form-select"
              aria-label="Default select example"
            >
              <option :value="section.id" v-for="(section, index) in sections" :key="index">
                {{ section.sectionName }}
              </option>
            </select>
            <span v-if="this.v$.postAddress.$error" class="error-message">
              الوسم مطلوب
            </span>
            <h4 class="text-white text-end mb-3 mt-3">التعليقات</h4>
            <select
              v-model="commentsStatus"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected value="enabled">مفعل</option>
              <option value="disabled">غير مفعل</option>
            </select>
            <span v-if="this.v$.commentsStatus.$error" class="error-message">
              يجب علي اختيار احد الخيارات
            </span>
            <h4 class="text-white text-end mb-3 mt-3">الظهور</h4>
            <select
              v-model="appear"
              class="form-select"
              aria-label="Default select example"
            >
              <option value="public" selected>عام</option>
              <option value="private">خاص</option>
            </select>
            <span v-if="this.v$.appear.$error" class="error-message">
              يجب علي اختيار حاله الظهور للتدوينه
            </span>
            <h4 class="text-white text-end mb-3 mt-3">الحاله</h4>
            <select
              v-model="postStatus"
              class="form-select mb-3"
              aria-label="Default select example"
            >
              <option value="to publish" selected>نشر</option>
              <option value="Draft">مسوده</option>
            </select>
            <span v-if="this.v$.appear.$error" class="error-message">
              يجب علي اختيار حاله التدوينه
            </span>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="addPost()"
            type="button"
            class="btn btn-dark btn-submit"
          >
            اضف الان
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
import { required, maxLength, url, minLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "addPost",
  components: {
    dashboardNavbar,
    routersNavbar,
    VueEditor,
  },
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      content: "<h3></h3>",
      postAddress: "",
      postPhoto: "",
      brief: "",
      tag: "",
      commentsStatus: "",
      appear: "",
      postStatus: "",
      tags: [],
      successActive: "",
      errorActive: "",
      section: "",
      sections: [],
    };
  },
  validations() {
    return {
      postAddress: { required, maxLength: maxLength(60) },
      content: { required, minLength: minLength(40) },
      postPhoto: { url, required },
      brief: { required, maxLength: maxLength(160) },
      tag: { required },
      section: { required },
      commentsStatus: { required },
      appear: { required },
      postStatus: { required },
    };
  },
  mounted() {
    let result = axios.get(`http://localhost:3000/tags`).then((response) => {
      this.tags = response.data;
    });
    let sections = axios
      .get(`http://localhost:3000/sections`)
      .then((response) => {
        this.sections = response.data;
      });
  },
  methods: {
    addPost() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let post = axios
          .post(`http://localhost:3000/posts`, {
            postAddress: this.postAddress,
            content: this.content,
            postPhoto: this.postPhoto,
            brief: this.brief,
            tagId: this.tag,
            commentsStatus: this.commentsStatus,
            appear: this.appear,
            postStatus: this.postStatus,
            sectionId: this.section,
          })
          .then(
            (response) => {
              this.errorActive = false;
              this.successActive = true;
              setTimeout(() => {
                this.$router.push({ name: "postingView" });
              }, 2000);
            },
            (reject) => {
              this.errorActive = true;
              this.successActive = false;
            }
          );
      } else {
        console.log("Not Valid");
      }
    },
  },
};
</script>
<style scoped>
.edit {
  background-color: white;
  text-align: end;
  margin-bottom: 15px;
}

form.editor {
  border: 2px solid #313844;
}
.row .border-top {
  box-shadow: 0px 1px 4px -1px #828282;
}
.btn-submit {
  width: 200px;
  font-weight: bold;
}
@media (max-width: 991px) {
  .parent-editor {
    margin-bottom: 20px;
  }
}
.successMessage.active {
  top: 175px;
}
</style>
