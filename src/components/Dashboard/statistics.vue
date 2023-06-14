<template>
  <div class="parent p-3">
    <h3 class="text-white text-center mb-2 fw-bold head">الاحصائيات</h3>
    <div class="container container-statis p-4">
      <div class="box text-white p-4">
        <h5 class="text-end mb-4 fw-bold">اجمالي المستخدمين</h5>
        <div class="d-flex align-items-center justify-content-between">
          <vue-ellipse-progress
            :progress="10"
            color="#fe89cb"
            :size="100"
            emptyColor="#5a495f"
            fontSize="1.5rem"
          />
          <h3 class="me-3">
            {{ usersList }}
            <h5>المستخدمين</h5>
          </h3>
        </div>
      </div>
      <div class="box text-white p-4">
        <h5 class="text-end mb-4 fw-bold">اجمالي التعليقات</h5>
        <div class="d-flex align-items-center justify-content-between">
          <vue-ellipse-progress
            :progress="10"
            color="#10c469"
            :size="100"
            emptyColor="#2a544b"
            fontSize="1.5rem"
          />
          <h3 class="me-3">
            {{ commentsList }}
            <h5>تعليفات</h5>
          </h3>
        </div>
      </div>
      <div class="box text-white p-4">
        <h5 class="text-end mb-4 fw-bold">اجمالي التدوينات</h5>
        <div class="d-flex align-items-center justify-content-between">
          <vue-ellipse-progress
            :progress="10"
            color="#ffbd4a"
            :size="100"
            emptyColor="#ffe6ba"
            fontSize="1.5rem"
          />
          <h3 class="me-3">
            {{postsList}}
            <h5>تدوينات</h5>
          </h3>
        </div>
      </div>
      <div class="box text-white p-4">
        <h5 class="text-end mb-4 fw-bold">اجمالي البلاغات</h5>
        <div class="d-flex align-items-center justify-content-between">
          <vue-ellipse-progress
            :progress="10"
            color="#f05050"
            :size="100"
            emptyColor="#f9b9b9"
            fontSize="1.5rem"
          />
          <h3 class="me-3">
            {{reportsList}}
            <h5>البلاغات</h5>
          </h3>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 col-sm-12 col-md-12 col-lg-8 custmozie mb-sm-5">
          <canvas id="myChart"></canvas>
        </div>
        <div class="col-4 col-sm-12 col-md-12 col-lg-4 custmozie">
          <canvas height="auto" id="myChart2" class="myChart2"></canvas>
        </div>
      </div>
    </div>
    <moderators></moderators>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { VueEllipseProgress } from "vue-ellipse-progress";
import moderators from "@/components/Dashboard/moderators.vue";
import axios from "axios";
export default {
  name: "statistics",
  components: { VueEllipseProgress, moderators },
  data() {
    return {
      usersList: [],
      postsList: [],
      commentsList: [],
      reportsList: [],
    };
  },
  mounted() {
    let result = axios
      .get(`http://localhost:3000/users`)
      .then((response) => {
        this.usersList = response.data.length;
      })
      .then((response) => {
        let result = axios
          .get(`http://localhost:3000/comments`)
          .then((response) => {
            this.commentsList = response.data.length;
          })
          .then((response) => {
            let result = axios
              .get(`http://localhost:3000/posts`)
              .then((response) => {
                this.postsList = response.data.length;
              })
              .then((response) => {
                let result = axios
                  .get(`http://localhost:3000/reports`)
                  .then((response) => {
                    this.reportsList = response.data.length;
                  });
              });
          });
      });
    console.log();
    const ctx = document.getElementById("myChart");
    const chart = document.getElementById("myChart2");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["البلاغات", "تدوينات", "التعليقات", "المستخدمين"],
        datasets: [
          {
            label: "الاحصائيات",
            data: [0, 6, 0, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        backgroundColor: ["#f05050", "#ffbd4a", "#10c469", "#fe89cb"],
      },
    });
    const data = {
      datasets: [
        {
          label: "الاحصائيات  ",
          labels: ["البلاغات", "تدوينات", "التعليقات", "المستخدمين"],
          data: [300, 50, 100, 50],
          backgroundColor: ["#ffbd4a", "#10c469", "#f05050", "#fe89cb"],
          hoverOffset: 4,
        },
      ],
    };
    new Chart(chart, {
      type: "doughnut",
      data: data,
    });
  },
};
</script>

<style scoped>
.parent {
  background-color: var(--section-Color);
}
.box {
  background-color: var(--third-Color);
  border-radius: 5px;
}
.container-statis {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.head {
  margin: auto;
  width: 70%;
}
@media (max-width: 991px) {
  canvas.myChart2 {
    height: 100% !important;
    width: 100% !important;
  }
  .custmozie {
  }
}
@media (max-width: 567px) {
  .custmozie {
    width: 100%;
    margin-bottom: 30px;
  }
}
#myChart,
#myChart2 {
  background-color: var(--third-Color);
}
</style>
