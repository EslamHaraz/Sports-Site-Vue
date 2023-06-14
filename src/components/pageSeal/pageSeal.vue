<template>
  <div class="container bg-dark footer">
    <div class="row align-items-center main-row justify-content-evenly">
      <div class="col-md-6 col-sm-12 col-lg-4 edit-height text-end">
        <div class="info mb-2">
          <img :src="siteLogo" alt="" class="mb-4 w-50" />
          <p class="text-white">Any Qustions? Call Us on (+20) 1206826248</p>
        </div>
        <ul class="d-flex list-unstyled w-50 p-0">
          <li class="m-auto">
            <a class="d-block text-light" href="#">
              <svg
                class="svg-inline--fa fa-facebook fa-lg facebook rounded-circle p-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                ></path>
              </svg>
            </a>
          </li>
          <li class="m-auto">
            <a class="d-block text-light" href="#">
              <svg
                class="svg-inline--fa fa-twitter fa-lg twitter rounded-circle p-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                ></path>
              </svg>
            </a>
          </li>
          <li class="m-auto">
            <a class="d-block text-light" href="#">
              <svg
                class="svg-inline--fa fa-linkedin fa-lg linkedin rounded-circle p-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="linkedin"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                ></path>
              </svg>
            </a>
          </li>
          <li class="m-auto">
            <a class="d-block text-light" href="#">
              <svg
                class="svg-inline--fa fa-google fa-lg google rounded-circle p-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-4 edit-height text-end">
        <div class="article">
          <h5 class="text-light">افضل المقالات</h5>
          <ul class="list-unstyled lh-lg p-0">
            <div
              v-for="(post, index) in perfectPostes"
              :key="index"
              v-if="post.postStatus === 'to publish'"
              class="perfect-article d-flex mt-4"
            >
              <router-link
                :to="{
                  name: 'articleView',
                  params: { postId: post.id, sectionId: post.sectionId },
                }"
                class="d-flex align-items-center"
              >
                <img :src="post.postPhoto" class="img-fluid img" />
                <div class="d-flex flex-column me-3">
                  <h3 class="content">{{ post.postAddress }}</h3>
                </div>
              </router-link>
            </div>
          </ul>
        </div>
      </div>
      <div class="col-md-6 col-lg-2 edit-height text-end">
        <h5 class="text-light">الارشيف</h5>
        <div class="links">
          <ul class="list-unstyled lh-lg p-0">
            <h5 class="text-white-50">ابريل - 2023(27)</h5>
            <li class="list-item">
              <router-link class="text-white-50" :to="{ name: 'privacyView' }"
                >سياسه الخصوصيه
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "pageSeal",
  data() {
    return {
      settingPage: [],
      siteLogo: "",
      perfectPostes: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/settingPage`)
      .then((response) => {
        this.settingPage = response.data;
        this.siteLogo = response.data[0].siteLogo;
      })
      .then((response) => {
        let result = axios
          .get(`http://localhost:3000/posts`)
          .then((response) => {
            this.perfectPostes = response.data;
            this.perfectPostes = this.perfectPostes.reverse().slice(0, 3);
          });
      });
  },
};
</script>
<style scoped>
.content {
  color: white;
  font-size: 20px;
}
.img {
  width: 40%;
}
.main-row {
  padding: 70px 0;
}
.edit-height {
  height: 400px;
}
@media (max-width: 991px) {
  .edit-height {
    height: auto;
  }
}
.perfect-article {
  text-align: right;
}
</style>
