<template >
  <div id="app">
    <transition name="fade" mode="out-in">
    <router-view />
    </transition>
  </div>
</template>

<style>
#app {
  direction: rtl;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.fade-enter,.fade-leave-to {
  opacity: 0;
  transform: translateX(2em);
}
.fade-enter-active,.fade-leave-enter {
  transition: all 0.6s ease;
}
</style>
