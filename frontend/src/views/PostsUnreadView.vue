<template>
  <div class="home">
    <HomeHeader />
    <div class="container-box">
      <HomeSidebar />
      <PostsUnread />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PostsUnreadView",
  components: {
    "HomeHeader": require("@/components/HomeHeader.vue").default,
    "HomeSidebar": require("@/components/HomeSidebar.vue").default,
    "PostsUnread": require("@/components/PostsUnread.vue").default
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
