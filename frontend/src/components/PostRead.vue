<template>
  <main class="post">
    <h1>Read a post</h1>
    <div class="align-cards">
      <div class="card-container">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text">{{ post.content }}</p>
        <div class="card-media" v-show="post.contentImgUrl">
          <img :src="post.contentImgUrl" :alt="'picture of ' + post.title">
        </div>
        <div class="card-footer">
          <button type="button" class="card-button" v-show="post.userId === auth.userId" @click="modifyPost">Modify</button>
          <button type="button" class="card-button" v-show="post.userId === auth.userId" @click="deletePost">Delete</button>
          <button type="button" class="card-like" :class="{ 'card-liked': isLike }" @click="likePost">
            <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "PostRead",
  data: function() {
    return {
      isLike: false
    }
  },
  computed: {
    ...mapState({
    post: "singlePost",
    auth: "auth"
  })},
  beforeMount(){
    this.getSinglePost()
    // this.colorLike()
  },
  mounted() {
    this.colorLike()
  },
  methods: {
    getSinglePost() {
      return this.$store.dispatch("getSinglePost")
      .then(
        () => {
          this.$store.dispatch("readPost", {
            postId: this.post.postId,
            userId: this.auth.userId
          });
        }
      )
      // .then(
      //   () => {
      //     const liked = this.post.LikePosts.some(post => post.userId === this.auth.userId)
      //     console.log(liked)
      //     if (this.post.LikePosts.length && liked) {
      //       this.isLike = true
      //     }
      //     console.log("this.isLike = ", this.isLike)
      //   }
      // )
    },
    likePost() {
      this.isLike = !this.isLike;
      return this.$store.dispatch("likePost", {
        postId: this.post.postId,
        userId: this.auth.userId
      }); 
    },
    colorLike() {
      console.log(this.post)
      const liked = this.post.LikePosts.some(post => post.userId === this.auth.userId)
      console.log(liked)
      if (this.post.LikePosts.length && liked) {
        this.isLike = true
      }
      console.log("this.isLike = ", this.isLike)
    },
    modifyPost() {
      return this.$router.push(`/posts/modify/${this.post.postId}`);
    },
    deletePost() {
      return this.$store.dispatch("deleteSinglePost", { postId: this.post.postId }).then(
        () => {
          this.$router.push("/posts");
        }
      )
    }
  }
}


</script>

<style lang="scss" scpoed>
.post {
  width: 100%;
  padding: 40px;
}

.align-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card {
  &-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100vh;
    padding: 20px;
    border: solid 2px lightgrey;
    border-radius: 5px;
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
    border: solid 3px black;
    border-radius: 5px;
    background: none;
    &:hover {
      background-color: orangered;
      color: white;
      border: none;
    }
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