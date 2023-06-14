<template>
  <div class="container mt-5 ">
    <div v-for="(modreator,index) in moderatorsList " :key="index" class="moderato-box d-flex justify-content-around align-items-center  p-4 ">
      <img :src="modreator.adminPhoto" class="img-fluid" />
      <div class="info  text-end">
        <h4 class="text-white fw-bold">{{modreator.adminName}}</h4>
        <h6 class="email">{{modreator.adminEmail}}</h6>
        <span class="admin fw-bold">{{modreator.supervisorStatus}}</span>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "moderators",
  data(){
    return {
      moderatorsList:[]
    }
  },
  mounted(){
    let result =  axios.get(`http://localhost:3000/admins`).then((response)=>{
      this.moderatorsList = response.data
      this.moderatorsList = this.moderatorsList.reverse().slice(0,3)
    })
  }
};
</script>
<style scoped>
.moderato-box {
    background-color: var(--third-Color);
    border-radius: 7px;
}
.moderato-box img {
    border-radius: 50%;
    width: 28%;
}
.email {
    color: var(--text-Color);
}
.admin {
    color: #ffbd4a;
}

.container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}
</style>
