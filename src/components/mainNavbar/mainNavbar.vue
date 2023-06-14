<template>
  <div class="container mt-3">
    <div
      class="parent d-flex justify-content-between align-items-center position-relative"
    >
      <ul
        class="list-unstyled p-0 align-items-center links bg-white text-end"
        :class="{ isActive: active }"
      >
        <li class="list-item ps-3 active">
          <router-link :to="{ name: 'home' }">الرئيسيه</router-link>
        </li>
        <li class="list-item ps-3">
          <router-link :to="{ name: 'TagsView' }">الوسوم</router-link>
        </li>
        <li class="list-item ps-3">
          <router-link :to="{ name: 'SectionsView' }">الاقسام</router-link>
        </li>
        <li class="list-item ps-3">
          <router-link :to="{ name: 'contactUsView' }">اتصل بنا</router-link>
        </li>
        <li class="list-item ps-3">
          <router-link :to="{ name: 'whoweAreView' }">من نحن</router-link>
        </li>
      </ul>
      <div class="logo d-flex justify-content-between align-items-center">
        <FontAwesome
          @click="active = !active"
          :icon="['fas', 'bars']"
          class="text-dark d-none"
        />
        <img class="img-fluid" :src="siteLogo" alt="Error 404" />
      </div>
    </div>
    <div
      class="search-news d-flex justify-content-between align-items-center mt-3"
    >
      <h3 class="text-end">المحتوي الرائج</h3>
      <div class="form-group position-relative">
        <input
          type="email"
          class="form-control text-center mt-2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="المحتوي الرائج"
        />
        <FontAwesome
          :icon="['fas', 'magnifying-glass']"
          class="text-dark position-absolute search-icon"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "mainNavbar",
  data() {
    return {
      active: false,
      settingPage: [],
      siteLogo: "",
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/settingPage`)
      .then((response) => {
        this.settingPage = response.data;
        this.siteLogo = response.data[0].siteLogo;
      });
  },
};
</script>
<style scoped>
a {
  font-weight: 700;
  transition: 0.2s;
  font-size: 22px;
}
.container {
  background-color: white !important;
}
.logo img {
  width: 80px;
  border-radius: 50%;
}
li.active a {
  color: var(--main-Color);
  font-weight: 700;
}
li a:hover {
  color: var(--main-Color);
}
@media (min-width: 567px) {
  ul.links {
    display: flex !important;
  }
}
@media (max-width: 567px) {
  .logo {
    width: 100%;
  }
  ul.links {
    position: absolute;
    width: 100%;
    top: 146px;
    opacity: 0;
    left: 0;
    transition: 0.5s;
    z-index: 856;
  }
  ul.links li {
    margin: 0 20px 10px;
  }
  .logo svg {
    display: block !important;
    font-size: 25px;
    cursor: pointer;
  }
}
ul.isActive {
  opacity: 1;
  z-index: 4;
}
.search-icon {
  right: 20px;
  top: 20px;
  font-size: 12px;
}
</style>
