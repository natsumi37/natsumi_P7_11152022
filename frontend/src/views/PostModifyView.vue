<template>
  <div class="home">
    <HomeHeader />
    <div class="container-box">
      <HomeSidebar />
      <PostModify />
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PostModifyView",
  components: {
    "HomeHeader": require("@/components/HomeHeader.vue").default,
    "HomeSidebar": require("@/components/HomeSidebar.vue").default,
    "PostModify": require("@/components/PostModify.vue").default
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