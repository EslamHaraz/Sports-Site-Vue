<template>
  <div class="parent position-relative">
    <div class="successMessage" :class="{ active: successActive }">
      <h3>تم حظر المستخدم بنجاح</h3>
      <FontAwesome :icon="['fas', 'check']" class="" />
    </div>
    <div class="successMessage bg-danger" :class="{ active: errorActive }">
      <h3>حدث خطأ 404</h3>
      <FontAwesome :icon="['fas', 'xmark']" class="" />
    </div>
    <dashboard-Navbar></dashboard-Navbar>
    <routers-Navbar></routers-Navbar>
    <div class="container p-4 container-border mt-5">
      <h3 class="text-white text-end fw-bold">الابلاغات</h3>
      <form @submit.prevent class="d-flex align-items-center mt-4">
        <div class="input-search">
          <input
            type="email"
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
      </form>
      <table class="table table-striped taple-bg mt-4">
        <thead>
          <tr>
            <th scope="col " class="col-width td-display">#</th>
            <th scope="col">التعليق</th>
            <th scope="col">مقدم البلاغ</th>
            <th class="" scope="col">السبب</th>
            <th class="td-display" scope="col">الحاله</th>
            <th scope="col">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(report, index) in search"
            :key="index"
            v-if="report.status == 'Pending'"
          >
            <th class="td-display" scope="row">{{ index + 1 }}</th>
            <td>{{ report.comment }}</td>
            <td>{{ usersNames[index] }}</td>
            <td>{{ report.report }}</td>
            <td class="td-display">Pending</td>
            <td>
              <button
                @click="
                  getData(
                    report.id,
                    index,
                    report.userId,
                    report.commentId,
                    report.reporterId
                  )
                "
                class="btn btn-primary me-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                الرد
                <FontAwesome :icon="['fas', 'reply']" class="text-white" beat />
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
                        الرد علي الابلاغ
                      </h5>
                    </div>
                    <h4 class="modal-body">
                      <h5 class="text-end fw-bold">الاجراء</h5>
                      <div
                        class="options mb-3 d-flex justify-content-evenly align-items-center"
                      >
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="delete"
                            v-model="mode"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            حذف التعليق
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="block"
                            v-model="mode"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            حظر المستخدم
                          </label>
                        </div>
                      </div>
                      <h5 class="text-end fw-bold">نتيجه الفحص</h5>
                      <div class="form-outline">
                        <textarea
                          class="form-control"
                          id="textAreaExample1"
                          rows="4"
                          placeholder="الرد"
                          v-model="resultScan"
                        ></textarea>
                        <span
                          class="text-danger d-block w-100 text-end mt-2 mb-2"
                          v-if="resultScan.length > 1 && resultScan.length < 6"
                          >بجب كتابه علي الاقل 5 حروف</span
                        >
                      </div>
                    </h4>
                    <div class="modal-footer">
                      <button

                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        id="close"
                      >
                        الغاء
                      </button>
                      <button
                        @click="makeAction(report.id)"
                        type="button"
                        class="btn btn-danger"
                      >
                        رد الان
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
        :items="reportsList"
        @changePage="onChangePage"
      >
      </jw-pagination>
      <div v-if="reportsList.length == 0" class="message-Length">
        <h3>لا يوجد بلاغات</h3>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardNavbar from "@/components/Dashboard/dashboardNavbar.vue";
import routersNavbar from "@/components/Dashboard/routersNavbar.vue";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "reportingView",
  components: {
    dashboardNavbar,
    routersNavbar,
    JwPagination,
  },
  data() {
    return {
      reportsList: [],
      mode: "",
      reportId: "",
      reportIndex: "",
      resultScan: "",
      userId: "",
      commentId: "",
      reporterId: "",
      usersNames: [],
      userDetails: [],
      user: "",
      successActive: "",
      errorActive: "",
      value: "",
      pageOfItems: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/reports?status=Pending`)
      .then((response) => {
        this.reportsList = response.data;
      })
      .then((response) => {
        for (let i = 0; i < this.reportsList.length; i++) {
          let result = axios
            .get(
              `http://localhost:3000/users/${this.reportsList[i].reporterId}`
            )
            .then((response) => {
              this.usersNames.push(response.data.Name);
            });
        }
      });
  },
  computed: {
    search() {
      if (this.value.trim().length > 0) {
        return this.pageOfItems.filter((item) =>
          item.report.includes(this.value.trim().toLowerCase())
        );
      } else {
        return this.pageOfItems;
      }
    },
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getData(reportId, index, userId, commentId, reporterId) {
      (this.reportId = reportId),
        (this.reportIndex = index),
        (this.userId = userId);
      this.reporterId = reporterId;
      this.commentId = commentId;
      let result = axios
        .get(`http://localhost:3000/users/${this.userId}`)
        .then((response) => {
          console.log(response.data.Name);
          this.user = response.data;
        });
    },
    makeAction() {
      if (this.mode === "delete" && this.resultScan.length >= 5) {
        this.replyTouser();
        let result = axios
          .delete(`http://localhost:3000/comments/${this.commentId}`)
          .then((response) => {
            this.replyTouser();
            document.getElementById("close").click();
            this.reportsList.splice(this.reportIndex, 1);
            this.successActive = true;
            this.errorActive = false;
            setTimeout(() => {
              this.successActive = false;
              document.getElementById('close').click()
            }, 100);
          })
          .catch((reject) => {
            this.successActive = false;
            this.errorActive = true;
          });
      } else if (this.mode === "block" && this.resultScan.length >= 5) {
        console.log(`Blocked User is ${this.user.Name}`);
        let result = axios
          .put(`http://localhost:3000/users/${this.user.id}`, {
            Name: this.user.Name,
            Email: this.user.Email,
            Password: this.user.Password,
            Phone: this.user.Phone,
            status: "Blocked",
            userPhoto: this.user.userPhoto,
          })
          .then((response) => {
            this.replyTouser();
            this.successActive = true;
            this.errorActive = false;
            setTimeout(() => {
              this.successActive = false;
              document.getElementById('close').click()
            }, 100);
          })
          .catch((reject) => {
            this.successActive = false;
            this.errorActive = true;
          });
      }
    },
    replyTouser() {
      let result = axios.put(`http://localhost:3000/reports/${this.reportId}`, {
        resultScan: this.resultScan,
        reporterId: this.reporterId,
        userId: this.userId,
        action: this.mode,
        status: "complete",
      });
    },
  },
};
</script>
<style scoped>
#exampleModal {
  z-index: 45646546546;
}
.form-check {
  font-size: 19px;
}
</style>
