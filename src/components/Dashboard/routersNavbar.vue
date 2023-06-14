<template>
  <div class="parent">
    <div class="container position-relative">
      <FontAwesome
        :icon="['fas', 'bars']"
        class="icon-position text-white"
        @click="active = !active"
      />
      <ul
        class="pt-4 pb-3 d-flex justify-content-between align-items-center flex-wrap mb-0 links"
        :class="{ active: active }"
      >
        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'envelopes-bulk']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'postingView' }"
            >التدوينات
          </router-link>
        </li>
        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'pager']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'pagesView' }"
            >الصفحات
          </router-link>
        </li>
        <li   v-if="status == 'superAdmin'" class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'users']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'usersView' }"
            >المستخدمين
          </router-link>
        </li>
        <li
          v-if="status == 'superAdmin'"
          class="d-flex align-items-center me-2 mb-2"
        >
          <FontAwesome
            :icon="['fas', 'screwdriver-wrench']"
            class="icon-Color"
          />
          <router-link class="me-2 fw-bold" :to="{ name: 'adminsView' }"
            >المشرفين
          </router-link>
        </li>
        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'tag']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'tagsView' }"
            >الوسوم
          </router-link>
        </li>
        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'book']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'sectionsView' }"
            >الاقسام
          </router-link>
        </li>

        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'comments']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'commentsView' }"
            >تعليقات
          </router-link>
        </li>
        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'message']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'messagesView' }"
            >الرسائل
          </router-link>
        </li>
        <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'bug']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: 'reportingView' }"
            >الابلاغات
          </router-link>
        </li>

        <li
          v-if="status == 'superAdmin'"
          class="d-flex align-items-center me-2 mb-2"
        >
          <FontAwesome :icon="['fas', 'gears']" class="icon-Color" />

          <router-link class="me-2 fw-bold" :to="{ name: 'settingView' }"
            >الاعدادات
          </router-link>
        </li>
        <!-- <li class="d-flex align-items-center me-2 mb-2">
          <FontAwesome :icon="['fas', 'list-check']" class="icon-Color" />
          <router-link class="me-2 fw-bold" :to="{ name: '' }"
            >فهرسه التدوينات
          </router-link>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "routersNavbar",
  data() {
    return {
      active: false,
      status: "",
    };
  },
  mounted() {
    let admin = window.localStorage.getItem("admin-info");
    if (admin) {
      this.status = JSON.parse(admin).supervisorStatus;
    }
  },
};
</script>

<style scoped>
ul.links.active {
  left: 0px;
}
.parent {
  background-color: var(--third-Color);
}
.container a {
  color: var(--text-Color);
}
.icon-Color {
  color: var(--text-Color);
}
.icon-position {
  display: none;
}
@media (max-width: 991px) {
  ul.links {
    position: absolute;
    background-color: #313844;
    display: block !important;
    z-index: 45;
    left: 120%;
    transition: 0.5s;
    width: 100%;
    top: 70px;
  }
  ul.links li {
    margin-bottom: 25px !important;
  }
  .icon-position {
    display: block;
    position: absolute;
    left: 50px;
    top: 15px;
    font-size: 30px;
    z-index: 10000;
    cursor: pointer;
  }
}
body {
  background-color: #2c333e !important;
  height: 100vh;
}
.parent {
  z-index: 1000001;
  position: relative;
}
</style>
