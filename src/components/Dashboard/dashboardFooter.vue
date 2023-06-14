<template>
  <div class="parent">
    <div
      class="container mt-3 d-flex justify-content-between align-items-center footer"
    >
      <h4 class="copyright">
        2023 © Programmed by &#10084;&#65039; Islam Haraz &#10084;&#65039; all
        rights reserved
      </h4>
      <div class="about-me">
        <h4>
          <a href="https://www.facebook.com/islam.haraz.3">About Me</a>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dashboardFooter",
};
</script>
<style scoped>
.parent {
  background-color: var(--third-Color);
  padding: 10px;
}
.about-me a,
.copyright {
  color: var(--text-Color);
}
@media (max-width: 567px) {
  .container {
    flex-direction: column;
  }
}

</style>
