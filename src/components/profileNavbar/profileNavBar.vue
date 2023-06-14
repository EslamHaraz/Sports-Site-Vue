<template>
  <div
    class="container p-4 bg-dark d-flex align-items-center justify-content-between"
  >
    <nav class="p-0">
      <div v-if="!user" class="user-login">
        <router-link
          class="text-light ms-3 d-inline-block"
          :to="{ name: 'loginView' }"
          >تسجيل دخول</router-link
        >
        <router-link
          class="text-light d-inline-block"
          :to="{ name: 'signUpView' }"
          >انشاء حساب</router-link
        >
      </div>
      <div v-if="user" class="profile-box d-flex align-items-center">
        <img v-if="userImage" :src="userImage" class="img-fluid" />
        <img
          v-else-if="!userImage"
          src="@/assets/pngwing.com.png"
          class="img-fluid"
        />
        <router-link :to="{ name: 'profileView' }">
          <h5 class="text-white mb-0 me-3 user-Name">{{ userName }}</h5>
        </router-link>
        <h5
          v-if="user && this.status == 'Blocked'"
          class="me-2 mb-0 text-white"
        >
          الحاله : محظور
        </h5>
      </div>
    </nav>
    <div class="signout-icon d-flex align-items-center position-relative">
      <div class="notfication-box ms-3 position-relative">
        <FontAwesome
          @click="(message = !message), removeNotifications()"
          :icon="['fas', 'bell']"
          class="text-light"
        />
        <div
          v-if="message"
          class="box-message d-flex align-items-center flex-column"
        >
          <div
            v-for="(reply, index) in replaysList"
            :key="index"
            class="message w-100 d-flex align-items-center p-3"
          >
            <FontAwesome :icon="['fas', 'ban']" class="text-light" />
            <div
              class="content d-flex align-items-center w-100 justify-content-evenly"
            >
              <h5 class="mb-0 text-white">{{ reply.Message }}</h5>
              <p class="mb-0 text-white">منذ 5 دقائق</p>
            </div>
          </div>
          <div
            v-for="(report, index) in reportsList"
            :key="index"
            v-if="report.action === 'block'"
            class="message w-100 d-flex align-items-center p-3"
          >
            <FontAwesome :icon="['fas', 'ban']" class="text-light" />
            <div
              class="content d-flex align-items-center w-100 justify-content-evenly"
            >
              <h5 class="mb-0 text-white">{{ report.resultScan }}</h5>
              <p class="mb-0 text-white">منذ 5 دقائق</p>
            </div>
          </div>
          <div
            v-for="(report, index) in reportsList"
            :key="index"
            v-if="report.action === 'delete'"
            class="message w-100 d-flex align-items-center p-3"
          >
            <FontAwesome :icon="['fas', 'trash']" class="text-white" />
            <div
              class="content d-flex align-items-center w-100 justify-content-evenly"
            >
              <h5 class="mb-0 text-white">{{ report.resultScan }}</h5>
              <p class="mb-0 text-white">منذ 5 دقائق</p>
            </div>
          </div>
        </div>
      </div>
      <FontAwesome
        @click="signout()"
        title="signOut"
        :icon="['fas', 'right-from-bracket']"
        class="text-light"
      />
      <span
        v-if="replaysList.length > 0 || reportsList.length > 0"
        class="bg-danger position-absolute notfication-number text-white fw-bold"
        >{{ replaysList.length + reportsList.length }}</span
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "profileNavBar",
  data() {
    return {
      message: false,
      userName: "",
      user: false,
      userImage: "",
      active: false,
      status: "",
      userId: "",
      replaysList: [],
      reportsList: [],
    };
  },
  mounted() {
    let user = window.localStorage.getItem("user-data");
    if (user) {
      this.user = true;
      this.userId = JSON.parse(user).id;

      let result = axios
        .get(`http://localhost:3000/users/${this.userId}`)
        .then((response) => {
          this.userName = response.data.Name;
          this.userImage = response.data.userPhoto;
          this.userImage = response.data.userPhoto;
          this.status = response.data.status;
        })
        .then((response) => {
          let result = axios
            .get(`http://localhost:3000/replytoUsers?userI=${this.userId}`)
            .then((response) => {
              this.replaysList = response.data;
            })
            .then((response) => {
              let result = axios
                .get(`http://localhost:3000/reports?userId=${this.userId}`)
                .then((response) => {
                  this.reportsList = response.data;
                });
            });
        });
    }
  },
  methods: {
    signout() {
      window.localStorage.removeItem("user-data");
      window.location.reload();
    },
    removeNotifications() {
      let result = axios
        .delete(`http://localhost:3000/reports?userId=${this.userId}`)
    },
  },
};
</script>
<style scoped>
.container {
  height: 90px;
}
.signout-icon svg {
  cursor: pointer;
}
.profile-box {
}
.profile-box img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.box-message {
  position: absolute;
  z-index: 4;
  left: -20px;
  width: 350px;
  top: 56px;
  transition: 0.5s linear;
}
.message {
  background-color: #212529;
}
.notfication-number {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  top: -10px;
  right: -19px;
}
.user-Name {
  text-transform: capitalize;
}
</style>
