<template>
  <div class="parent">
    <profile-NavBar></profile-NavBar>
    <main-Navbar></main-Navbar>
    <div class="container">
      <div class="row mt-5">
        <div class="col-12 col-lg-8 text-end">
          <h3 class="fw-bold mb-4">{{ postAddress }}</h3>
          <h6>
            <span>بواسطه Admin</span>
          </h6>
          <img :src="postPhoto" class="img-fluid w-100" />
          <p class="content mt-4" v-html="content"></p>
          <h4 class="mb-4">الوسم : {{ tagName }}</h4>
          <div v-if="user && this.status == 'Good'" class="comment-box">
            <h3 class="fw-bold">التعليقات</h3>

            <div class="form-floating parent-input m-auto mb-2 mt-3">
              <textarea
                class=""
                placeholder=" اترك تعليقا"
                id=""
                v-model="comment"
              ></textarea>
              <button
                @click="sendComment()"
                type="submit"
                class="btn send-btn w-100 text-light fs-4 p-0"
              >
                اضف التعليق
              </button>
            </div>
          </div>
          <div v-else class="d-block p-3 sign-comment">
            <h5 class="mb-0">
              يحب تسجيل الدخول للتمتع بهذه الميزه ... سجل من
              <router-link :to="{ name: 'loginView' }"> هنا </router-link>
            </h5>
          </div>
          <hr />
          <div
            v-for="(comment, index) in pageOfItems"
            :key="index"
            class="comments-box"
          >
            <div class="d-flex align-items-center">
              <img :src="comment.userPhoto" class="img-fluid custmoize-img" />
              <h5 class="me-3">{{ comment.user }} - <span>منذ ساعه</span></h5>
            </div>
            <h5 class="comment">{{ comment.comment }}</h5>
            <div class="report-reply" v-if="comment.user != userName">
              <h5>
                <span
                  v-if="user && comment.user != userName"
                  @click="
                    (report = !report),
                      getcommentData(
                        comment.comment,
                        comment.id,
                        comment.userId,
                        comment.user
                      )
                  "
                  class="react-comment ms-4"
                  >ابلاغ</span
                >
                <span
                  v-if="user && comment.user != userName"
                  @click="toReply = !toReply"
                  class="react-comment"
                  >رد</span
                >
              </h5>
            </div>
          </div>
          <div
            v-if="toReply && user && user != userName"
            class="form-floating parent-input m-auto mb-2 mt-3"
          >
            <textarea
              placeholder=" اترك تعليقا"
              v-model="toreplyContent"
            ></textarea>
            <button
              @click="makeAction()"
              type="submit"
              class="btn send-btn w-100 text-light fs-4 p-0 mt-2"
            >
              اضف الرد
            </button>
          </div>
          <div
            class="form-floating parent-input m-auto mb-2 mt-3"
            v-if="report && user && comment.user != userName"
          >
            <textarea
              placeholder="اذكر السبب"
              v-model="reportContent"
            ></textarea>
            <button
              @click="makeAction()"
              type="submit"
              class="btn send-btn w-100 text-light fs-4 p-0 mt-2"
            >
              ابلغ الان
            </button>
          </div>
          <jw-pagination
            :pageSize="4"
            :items="postComments"
            @changePage="onChangePage"
          >
          </jw-pagination>
        </div>

        <div class="col-lg-4 col-12">
          <div class="container">
            <related-Articles></related-Articles>
            <Tags></Tags>
            <Sections></Sections>
          </div>
        </div>
      </div>
    </div>

    <page-Seal></page-Seal>
  </div>
</template>
<script>
import profileNavBar from "@/components/profileNavbar/profileNavBar.vue";
import mainNavbar from "@/components/mainNavbar/mainNavbar.vue";
import relatedArticles from "@/components/relatedArticles/relatedArticles.vue";
import Sections from "@/components/Sections/Sections.vue";
import Tags from "@/components/Tags/Tags.vue";
import pageSeal from "@/components/pageSeal/pageSeal.vue";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, maxLength } from "vuelidate/lib/validators";
import JwPagination from "jw-vue-pagination";
export default {
  name: "articleView",
  components: {
    profileNavBar,
    mainNavbar,
    relatedArticles,
    Tags,
    Sections,
    pageSeal,
    JwPagination,
  },
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      postId: this.$route.params.postId,
      tagId: "",
      comments: "",
      comment: "",
      postAddress: "",
      content: "",
      postPhoto: "",
      commentsStatus: "",
      postStatus: "",
      tagName: "",
      userName: "",
      userId: "",
      user: false,
      postComments: [],
      pageOfItems: [],
      userPhoto: "",
      report: false,
      toReply: false,
      reportContent: "",
      toreplyContent: "",
      reportComment: "",
      commentId: "",
      userComment: "",
      status: "",
      user: "",
    };
  },
  validations() {
    return {
      comment: { required, maxLength: maxLength(80) },
    };
  },
  mounted() {
    let user = window.localStorage.getItem(`user-data`);
    if (user) {
      this.user = true;
      this.userId = JSON.parse(user).id;
      this.userPhoto = JSON.parse(user).userPhoto;
    }
    let result = axios
      .get(`http://localhost:3000/posts/${this.postId}`)
      .then((response) => {
        this.postAddress = response.data.postAddress;
        this.content = response.data.content;
        this.postPhoto = response.data.postPhoto;
        this.commentsStatus = response.data.commentsStatus;
        this.postStatus = response.data.postStatus;
        this.tagId = response.data.tagId;
      })
      .then((reponse) => {
        let result = axios
          .get(`http://localhost:3000/users/${this.userId}`)
          .then((response) => {
            this.userName = response.data.Name;
            this.userImage = response.data.userPhoto;
            this.status = response.data.status;
          });
      });
    setTimeout(() => {
      let result = axios
        .get(`http://localhost:3000/tags/${this.tagId}`)
        .then((response) => {
          this.tagName = response.data.tagName;
        });
    }, 200);
    let comments = axios
      .get(`http://localhost:3000/comments?postId=${this.postId}`)
      .then((response) => {
        this.postComments = response.data;
      });
  },
  methods: {
    getcommentData(comment, commentId, userId, userName) {
      this.reportComment = comment;
      this.commentId = commentId;
      this.userComment = userId;
      this.user = userName;
    },
    sendComment() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = axios
          .post(`http://localhost:3000/comments`, {
            comment: this.comment,
            user: this.userName,
            userPhoto: this.userPhoto,
            userId: this.userId,
            postId: this.postId,
          })
          .then((response) => {
            this.comment = "";
            this.postComments.unshift(response.data);
          });
      }
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },

    makeAction(commentId, comment) {
      if (
        this.toReply &&
        this.toreplyContent !== "" &&
        this.toreplyContent.length < 80
      ) {
        let result = axios
          .post(`http://localhost:3000/comments`, {
            comment: this.toreplyContent,
            user: this.userName,
            userId: this.userId,
            userPhoto: this.userPhoto,
            commentId: commentId,
            postId: this.postId,
          })
          .then((repoonse) => {
            this.toreplyContent = "";
            this.toReply === false;
            this.postComments.push(repoonse.data);
          });
      } else if (
        this.report &&
        this.reportContent !== "" &&
        this.reportContent.length < 80
      ) {
        let result = axios
          .post(`http://localhost:3000/reports`, {
            report: this.reportContent,
            user: this.userName,
            reporterId: this.userId,
            userId: this.userId,
            comment: this.reportComment,
            commentId: this.commentId,
            userId: this.userComment,
            status: "Pending",
          })
          .then((repoonse) => {
            this.reportContent = "";
            this.report === false;
          });
      }
    },
  },
};
</script>
<style scoped>
.content {
  font-size: 22px;
  font-weight: 600;
}
.sign-comment {
  background-color: #e1e1e1;
}
textarea {
  resize: none;
  height: 100px !important;
  width: 100%;
  border: 1px solid #ddd;
  padding: 15px;
  outline: none;
}
textarea::placeholder {
  font-size: 20px;
}
.send-btn {
  background-color: var(--main-Color);
}
.custmoize-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
h5.comment {
  width: 350px;
  text-align: end;
  font-size: 21px;
  font-weight: 600;
}
.react-comment {
  cursor: pointer;
}
.btn:hover {
  background-color: var(--main-Color);
  color: white;
}
.parent {
  background-color: white;
}
.pagination {
  margin: 40px 0px 20px 0px !important;
  padding: 0px;
  width: 90%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
@media (max-width: 567px) {
  .replys {
    margin-right: 10px !important
    ;
  }
}
</style>
