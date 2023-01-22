<template>
  <main class="post">
    <h1>See unread posts</h1>
    <div class="align-cards" v-for="post in posts" v-bind:key="post.post_id">
      <RouterLink :to="`/posts/${post.post_id}`">
        <div class="card-container">
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="card-text">{{ post.content }}</p>
          <div class="card-media" v-show="post.contentImgUrl">
            <img :src="post.contentImgUrl" :alt="'picture of ' + post.title">
          </div>
          <div class="card-footer">
            <div class="card-button" :class="{ 'card-liked': colorLike(post) }">
              <font-awesome-icon icon="fa-solid fa-thumbs-up" />
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PostsUnread",
  data: function() {
    return {

    }
  },
  computed: {
    ...mapState({
      posts: "unreadPosts",
      auth: "auth"
    })
  },
  beforeMount() {
    this.getUnreadPosts()
  },
  methods: {
    getUnreadPosts() {
      return this.$store.dispatch("getUnreadPosts");
    },
    colorLike(post) {
      console.log(post)
      // const liked = post.LikePosts.some(targetPost => targetPost.userId === this.auth.userId)
      // console.log(liked)
      // if (liked) {
      //   return true
      // }
    }
  }
}



</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
}
.post {
  width: 100%;
  padding: 40px;
}

.align-cards {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.card {
  &-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 350px;
    padding: 20px;
    border: solid 2px lightgrey;
    border-radius: 5px;
    &:hover {
      color: black;
      border: none;
      box-shadow: 1px 1px 8px 1px grey;
    }
    @media screen and (max-width: 760px) {
      width: 100%;
    }
  }
  &-title {
    border-bottom: solid 1px lightgray;
  }
  &-media img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  &-footer {
    display: flex;
    justify-content: end;
    gap: 20px;
    font-size: x-large;
    border: none;
    margin-top: auto;
  }
  &-button {
    background: none;
    border: none;
    .selected {
      color: orangered;
    }
  }
}

</style>