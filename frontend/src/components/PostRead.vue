<template>
  <main class="post">
    <h1>Read a post</h1>
    <div class="align-cards">
      <div class="card-container">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-written">By {{ post.userName }}</p>
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
      isLike: false,
    }
  },
  computed: {
    ...mapState({
    post: "singlePost",
    auth: "auth"
  })},
  beforeMount(){
    this.getSinglePost()
  },
  methods: {
    getSinglePost() {
      return this.$store.dispatch("getSinglePost")
      .then(
        () => {
          this.isLike = this.post.LikePosts.some(post => post.userId === this.auth.userId)
          this.$store.dispatch("readPost", {
            postId: this.post.postId,
            userId: this.auth.userId
          });
        }
      )
    },
    likePost() {
      this.isLike = !this.isLike;
      return this.$store.dispatch("likePost", {
        postId: this.post.postId,
        userId: this.auth.userId
      }); 
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

<style lang="scss" scoped>
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
  gap: 10px;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
}

.card {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 100vh;
    padding: 20px;
    border: solid 2px lightgrey;
    border-radius: 5px;
    // @media screen and (max-width: 760px) {
    //   width: 100%;
    // }
  }
  &-written {
    border-bottom: solid 1px lightgray;
    text-align: end;
  }
  &-media img {
    display: block;
    width: 80%;
    // height: 200px;
    object-fit: contain;
    margin: auto;
  }
  &-footer {
    display: flex;
    justify-content: end;
    gap: 20px;
    font-size: x-large;
    border: none;
    margin-top: 50px;
    @media screen and (max-width: 485px) {
      width: 90%;
      gap: 10px;
    }
    @media screen and (max-width: 420px) {
      flex-direction: column;
    }
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
    @media screen and (max-width: 485px) {
      font-size: smaller;
      gap: 5px;
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