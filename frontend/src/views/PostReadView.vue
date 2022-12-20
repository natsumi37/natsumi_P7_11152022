<template>
  <div class="home">
    <HomeHeader />
    <div class="container-box">
      <HomeSidebar />
      <PostRead />
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PostReadView",
  components: {
    "HomeHeader": require("@/components/HomeHeader.vue").default,
    "HomeSidebar": require("@/components/HomeSidebar.vue").default,
    "PostRead": require("@/components/PostRead.vue").default
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