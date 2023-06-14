<template>
  <div class="parent">
    <div
      class="container p-3 d-flex justify-content-between align-items-center"
    >
      <div class="box-logo">
        <router-link
          :to="{ name: 'dashboardView' }"
          class="d-flex align-items-center"
        >
          <h5 class="text-light mb-0 ms-2 fw-bold">{{ Name }}</h5>

          <!-- <img src="@/components/Dashboard/imgs/Logo.png" class="img-fluid" /> -->
          <img :src="Logo" class="img-fluid" />
        </router-link>
      </div>

      <div class="profile-setting d-flex align-items-center">
        <FontAwesome
          :icon="['fas', 'bell']"
          class="text-white icon ms-3"
          :class="{ 'fa-shake': message }"
          @click="(active = !active), clearActive()"
          id="bell"
        />
        <div class="notfications position-relative">
          <div
            class="box position-absolute text-white"
            :class="{ isActive: active }"
          >
            <h5>الاشعارات الجديده</h5>
            <hr />
            <div v-for="(message, index) in messagesList" :key="index">
              <router-link
                :to="{ name: 'messagesView' }"
                class="content d-flex align-items-center mb-3 justify-content-between text-white"
              >
                <div class="d-flex align-items-center">
                  <FontAwesome :icon="['fas', 'envelope']" class="" />
                  <h5 class="mb-0 me-3">يوجد رساله جديده</h5>
                </div>
                <div></div>
              </router-link>
            </div>
            <router-link
              v-for="(report, index) in reportsList"
              :key="index"
              :to="{ name: 'messagesView' }"
            >
              <div
                class="content d-flex align-items-center mb-3 justify-content-between text-white"
              >
                <div class="d-flex align-items-center">
                  <FontAwesome
                    :icon="['fas', 'triangle-exclamation']"
                    class=""
                  />
                  <h5 class="mb-0 me-3">يوجد بلاغ جديد</h5>
                </div>
                <div></div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="authintaction position-relative">
          <div @click="setting = !setting" class="d-flex align-items-center">
            <img src="@/assets/pngwing.com.png" class="img-fluid" />
            <h6 class="mb-0 text-white fw-bold me-2">{{ adminName }}</h6>
            <FontAwesome
              @click="setting = !setting"
              :icon="['fas', 'caret-down']"
              class="arrow-right text-white me-2"
            />
          </div>
          <div :class="{ isActive: setting }" class="setting position-absolute">
            <h6 class="fw-bold text-center mb-3">Welcome !</h6>
            <router-link :to="{ name: 'adminProfileView' }" class="d-flex">
              <FontAwesome
                :icon="['fas', 'user']"
                class="arrow-right text-white me-2"
              />
              <h6 class="fw-bold text-start me-2 text-white">My Acount</h6>
            </router-link>
            <hr />
            <div @click="logOut()" class="d-flex align-items-center fw-bold">
              <FontAwesome
                :icon="['fas', 'right-from-bracket']"
                class="text-white me-2"
              />
              <p @click="logOut()" class="text-white mb-0 me-3">Log Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: false,
      setting: false,
      adminName: "",
      messagesList: [],
      reportsList: [],
      message: "",
      status: "",
    };
  },
  computed: {
    ...mapState({
      Name: (state) => state.siteName,
      Logo: (state) => state.siteLogo,
      Icon: (state) => state.siteIcon,
    }),
  },
  mounted() {
    setTimeout(() => {
      if (document.getElementById("bell")) {
        document.getElementById("bell").classList.remove("fa-shake");
      }
    }, 3000);
    let admin = window.localStorage.getItem("admin-info");
    if (admin) {
      this.adminName = JSON.parse(admin).adminName;
      this.status = JSON.parse(admin).supervisorStatus;
      this.getsiteData();
    } else this.$router.push({ name: "home" });
    let result = axios
      .get(`http://localhost:3000/messages`)
      .then((response) => {
        if (response.data.length >= 3) {
          this.messagesList = response.data.slice(response.data.length - 2);
          this.message = true;
        } else {
          this.messagesList = response.data;
        }
      })
      .then((reponse) => {
        let result = axios
          .get(`http://localhost:3000/reports`)
          .then((response) => {
            if (response.data.length >= 3) {
              this.reportsList = response.data.slice(response.data.length - 2);
              this.message = true;
            } else {
              this.reportsList = response.data;
            }
          });
      });
  },
  methods: {
    getsiteData() {
      this.$store.commit("getsiteData");
    },
    clearActive() {
      document.getElementById("bell").classList.remove("fa-shake");
    },
    logOut() {
      window.localStorage.removeItem("admin-info");
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.parent {
  background-color: var(--section-Color);
}
.box-logo img {
  width: 80px;
  border-radius: 50%;
}

.notfications .box {
  background-color: var(--second-Color);
  padding: 10px;
  width: 290px;
  left: 20px;
  top: 60px;
  z-index: -1;
}
.content {
  transition: 0.2s linear;
}
.content:hover {
  opacity: 0.8;
}
.icon {
  cursor: pointer;
  font-size: 22px;
}
.box {
  opacity: 0;
  transition: 0.2s linear;
  z-index: 100001;
}
.box.isActive {
  top: 35px;
  opacity: 1;
  z-index: 4564654556465;
}
.authintaction {
  width: 150px;
}
.authintaction img {
  width: 25%;
}
.profile-setting {
  cursor: pointer;
}
.setting {
  width: 166px;
  background-color: var(--second-Color);
  color: white;
  top: 60px;
  padding: 20px;
  transition: 0.2s linear;
  opacity: 0;
  left: -16px;
  z-index: -1;
}

.setting.isActive {
  top: 35px;
  opacity: 1;
  z-index: 99999999999999999999999;
}
@media (max-width: 567px) {
  .notfications .box {
    left: 0px;
    top: 35px;
    width: 250px;
  }
  .content {
    flex-direction: column;
  }
  .content > div,
  .content > div h5 {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 10px;
  }
}
</style>
