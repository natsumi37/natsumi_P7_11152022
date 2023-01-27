<template>
  <main class="post">
    <h1>See all posts</h1>
    <div class="align-cards" v-for="post in posts" v-bind:key="post.post_id">
      <RouterLink :to="`/posts/${post.post_id}`">
        <div class="card-container">
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="card-written">By {{ post.user.firstName }} {{  post.user.lastName }}</p>
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
  name: "PostsAll",
  data: function() {
    return {
      // isLike: false
    }
  },
  computed: {
    ...mapState({
      posts: "allPosts",
      auth: "auth"
    })
  },
  beforeMount() {
    this.getAllPosts()
    this.colorLike()
  },
  methods: {
    getAllPosts() {
      return this.$store.dispatch("getAllPosts");
    },
    colorLike(post) {
      return post && post.LikePosts.some(post => post.userId === this.auth.userId)
    }
  }
}



</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}

.post {
  width: calc(90% - 80px);
  padding: 40px;
  @media screen and (max-width: 760px) {
    width: 100%;
    padding: 20px;
  }
}

.align-cards {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 15px;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
}

.card {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 400px;
    padding: 20px;
    border: solid 2px lightgrey;
    border-radius: 5px;
    &:hover {
      color: black;
      border: none;
      box-shadow: 1px 1px 8px 1px grey;
    }
    // @media screen and (max-width: 760px) {
    //   width: 100%;
    // }
  }
  &-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-written {
    border-bottom: solid 1px lightgray;
    text-align: end;
  }
  &-media img {
    display: block;
    width: 200px;
    max-height: 200px;
    object-fit: contain;
    margin: auto;
  }
  &-footer {
    display: flex;
    // justify-content: end;
    gap: 20px;
    font-size: x-large;
    border: none;
    margin-top: auto;
  }
  &-button {
    background: none;
    border: none;
    margin-left: auto;
  }
  &-like {
    background: none;
    border: none;
  }
  &-liked {
    color: orangered;
  }
}

</style>