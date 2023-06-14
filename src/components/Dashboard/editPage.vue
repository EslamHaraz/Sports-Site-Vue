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
      <h3 class="text-end fw-bold text-white">تعديل الصفحه</h3>
      <hr />

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
          </form>
        </div>
        <div class="col-lg-4 border-top pt-3">
          <form @submit.prevent>
            <h4 class="text-white text-end mb-3">الرابط الدائم</h4>
            <div class="form-group mb-3 fw-bold">
              <input
                type="url"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="رابط الصفحه"
                disabled
                v-model="linkPage"
              />
            </div>
          </form>
        </div>
        <div class="col-12 mt-4">
          <button
            @click="editPage()"
            type="button"
            class="btn btn-dark btn-submit"
          >
            حدث الان
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
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "editPage",
  setup: () => ({ v$: useValidate() }),
  components: {
    dashboardNavbar,
    routersNavbar,
    VueEditor,
  },
  data() {
    return {
      content: "<h3></h3>",
      linkPage: "",
      pageId: this.$route.params.pageId,
      successActive: "",
      errorActive: "",
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/pages/${this.pageId}`)
      .then((response) => {
        this.content = response.data.content;
        this.linkPage = response.data.link;
        this.pageName = response.data.pageName;
        this.linkPage = response.data.link;
      });
  },
  validations() {
    return {
      content: {
        required,
        minLength: minLength(50),
        maxLength: maxLength(400),
      },
    };
  },
  methods: {
    editPage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .put(`http://localhost:3000/pages/${this.pageId}`, {
            pageName: this.pageName,
            link: this.linkPage,
            content: this.content,
          })
          .then((response) => {
            this.errorActive = false;
            this.successActive = true;
            setTimeout(() => {
              this.$router.push({ name: "pagesView" });
            }, 2000);
          })
          .catch((resject) => {
            this.errorActive = true;
            this.successActive = false;
          });
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
.form-control:disabled {
  background-color: #d0d0d0;
}
</style>
