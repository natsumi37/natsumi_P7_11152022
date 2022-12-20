<template>
  <div class="home">
    <HomeHeader />
    <div class="container-box">
      <HomeSidebar />
      <PostCreate />
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PostCreateView",
  components: {
    "HomeHeader": require("@/components/HomeHeader.vue").default,
    "HomeSidebar": require("@/components/HomeSidebar.vue").default,
    "PostCreate": require("@/components/PostCreate.vue").default
  },
}

</script>

<style lang="scss">
.container-box {
  display: flex;
}

@media screen and (max-width: 760px) {
  .container-box {
    flex-direction: column-reverse;
  }
}
</style>