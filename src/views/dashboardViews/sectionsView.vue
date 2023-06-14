<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم تسجيل الدخول بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>البيانات خاطئه</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">الاقسام</h3>
      <form @submit.prevent class="d-flex align-items-center mt-4">
        <div class="input-search">
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="بحث"
            v-model="value"
          />
        </div>
        <button
          type="submit"
          class="btn search-btn fw-bold d-flex align-items-center justify-content-around text-white"
        >
          بحث
          <FontAwesome :icon="['fas', 'search']" class="text-white" />
        </button>
        <router-link :to="{ name: 'addSection' }">
          <button
            type="button"
            class="btn add-btn me-3 fw-bold d-flex align-items-center justify-content-around text-white"
          >
            اضف

            <FontAwesome :icon="['fas', 'plus']" class="text-white" />
          </button>
        </router-link>
      </form>
      <table class="table table-striped taple-bg mt-4 table-responsive">
        <thead>
          <tr>
            <th scope="col " class="col-width td-display">#</th>
            <th scope="col">الاسم</th>
            <th class="td-display" scope="col">الاسم الطيف</th>
            <th scope="col">الوصف</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(section, index) in search" :key="index">
            <th class="td-display" scope="row">{{ index + 1 }}</th>
            <td>{{ section.sectionName }}</td>
            <td class="td-display">{{ section.spectrumName }}</td>
            <td>{{ section.breif }}</td>
            <td>
              <router-link
                :to="{ name: 'editSection', params: { sectionId: section.id } }"
              >
                <button class="btn btn-primary ms-3 edit">
                  تعديل
                  <FontAwesome
                    :icon="['fas', 'pen-to-square']"
                    class="text-white"
                  />
                </button>
              </router-link>
              <button
                @click="getData(section.id, index)"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                حذف
                <FontAwesome :icon="['fas', 'trash']" class="text-white" />
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        حذف القسم
                      </h5>
                    </div>
                    <h4 class="modal-body">
                      هل انت متأكد من حذف القسم مع العلم ان البيانات سوف تمسح
                      نهائيا ؟
                    </h4>
                    <div class="modal-footer">
                      <button
                        id="close"
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        الغاء
                      </button>
                      <button
                        @click="deleteSection(section.id, index)"
                        type="button"
                        class="btn btn-danger"
                      >
                        حذف الان
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <jw-pagination
        :pageSize="10"
        :items="sections"
        @changePage="onChangePage"
      >
      </jw-pagination>
    </div>
    <div v-if="sections.length == 0" class="message-Length">
      <h3>لا يوجد اقسام</h3>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "sectionsView",
  data() {
    return {
      sections: [],
      successActive: "",
      errorActive: "",
      sectionId: "",
      sectionIndex: "",
      pageOfItems: [],
      value: "",
    };
  },
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  mounted() {
    let section = axios
      .get(`http://localhost:3000/sections`)
      .then((response) => {
        this.sections = response.data;
      });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.sectionName.includes(this.value.trim().toLowerCase())
        );
      } else {
        return this.pageOfItems;
      }
    },
  },
  methods: {
    getData(sectionId, index) {
      this.sectionId = sectionId;
      this.sectionIndex = index;
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    deleteSection(sectionId, index) {
      let result = axios
        .delete(`http://localhost:3000/sections/${this.sectionId}`)
        .then((response) => {
          this.successActive = true;
          this.errorActive = false;
          setTimeout(() => {
            this.successActive = false;
            document.getElementById("close").click();
          }, 1000);
        });
      this.sections.splice(this.sectionIndex, 1);
    },
  },
};
</script>
<style></style>
