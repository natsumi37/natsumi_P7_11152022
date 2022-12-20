<template>
  <div class="home">
    <HomeHeader />
    <div class="container-box">
      <HomeSidebar />
      <PostsAll />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PostsAllView",
  components: {
    "HomeHeader": require("@/components/HomeHeader.vue").default,
    "HomeSidebar": require("@/components/HomeSidebar.vue").default,
    "PostsAll": require("@/components/PostsAll.vue").default
  },
  computed:
  mapState([
    "posts"
  ]),
  ...mapGetters([
    "getUnreadPosts",
    "countUnreadPosts"
  ])
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
