<template>
  <div class="container news-container bg-white position-relative">
    <!-- Make a div wrapped slider,set height and width -->
    <div class="w-100 slider">
      <!-- Using the slider component -->
      <slider ref="slider" :options="options">
        <!-- slideritem wrapped package with the components you need -->
        <slideritem v-for="(post, index) in postesList" :key="index">
          <img class="mb-4" :src="post.postPhoto" />
          <h3 class="text-dark content">{{ post.postAddress }}</h3>
        </slideritem>
        <!-- Customizable loading -->
        <div slot="loading">loading...</div>
      </slider>
    </div>
  </div>
</template>
<script>
// import slider components

import { slider, slideritem } from "vue-concise-slider";
import axios from "axios";

export default {
  name: "sliderNews",
  data() {
    return {
      //data list [array]
      imgs: [
        {
          src: require("./img/img1.jpg"),

          content:
            "اكتسح التصويت.. محمد عبد المنعم الأفضل في ذهاب ربع نهائي دوري الأبطال",
        },
        {
          src: require("./img/img1.jpg"),

          content:
            "مصدر ليلا كورة: الإصابة تُبعد رأفت خليل عن قائمة الأهلي لمواجهة الرجاء بالأبطال",
        },
        {
          src: require("./img/img1.jpg"),

          content:
            ".. مصدر يكشف ليلا كورة سبب غياب معلول عن مران الأهلي قبل السفر للمغرب",
        },
        {
          src: require("./img/img1.jpg"),

          content:
            ".. مصدر يكشف ليلا كورة سبب غياب معلول عن مران الأهلي قبل السفر للمغرب",
        },
        {
          src: require("./img/img1.jpg"),

          content:
            ".. مصدر يكشف ليلا كورة سبب غياب معلول عن مران الأهلي قبل السفر للمغرب",
        },
        {
          src: require("./img/img1.jpg"),

          content:
            ".. مصدر يكشف ليلا كورة سبب غياب معلول عن مران الأهلي قبل السفر للمغرب",
        },
      ],
      postesList: [],
      //Slider configuration [obj]
      options: {
        currentPage: 0,
        autoplay: 3000,
        loop: true,
      },
    };
  },
  mounted() {
    let postes = axios.get(`http://localhost:3000/posts`).then((response) => {
      this.postesList = response.data;
    });
  },
  components: {
    slider,
    slideritem,
  },
};
</script>
<style scoped>
.news-container {
  border-bottom: 35px solid var(--main-Color);
  border-right: none;
}
.news-container::before,
.news-container::after {
  content: "";
  position: absolute;
  background-color: var(--main-Color);
  width: 2%;
  bottom: 0;
  height: 45%;
  z-index: 4;
}
.news-container::before {
  left: 0;
}
.news-container::after {
  right: 0;
}
.slider-pagination {
  background-color: red;
}
.slider-container {
  margin: 20px auto;
  padding: 10px 0;
  position: relative;
}
.content {
  z-index: -1;
  font-weight: 600;
}
.slider-item {
  margin-bottom: 20px;
  display: block;
}
.slider-item img {
  width: 50%;
}
.search-icon {
  left: 155px;
  top: 21px;
  font-size: 12px;
}
@media (max-width: 991px) {
  .content {
    font-size: 20px;
    white-space: break-spaces;
  }
}
@media (max-width: 567px) {
  .slider-item img {
    width: 350px;
  }
}
</style>
