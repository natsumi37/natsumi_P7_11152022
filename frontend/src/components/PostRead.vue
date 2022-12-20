<template>
  <main class="post">
    <h1>Read a post</h1>
    <div class="align-cards">
      <div class="card-container">
        <h2 class="card-title">{{ posts.title }}</h2>
        <p class="card-text">{{ posts.context }}</p>
        <div class="card-media">
          <img :src="posts.contentImg" :alt="'picture of ' + posts.title">
        </div>
        <div class="card-footer">
          <button type="button" class="card-button" :class="{ selected: likePost }" @click="toggleRead()">
            <i class="fa-solid fa-thumbs-up"></i>
          </button>
          <button type="button" class="card-button" :class="{ selected: commentPost }" @click="toggleComment()">
            <i class="fa-solid fa-reply"></i>
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
      likePost: false,
      commentPost: false
    }
  },
  computed: mapState([
    "posts"
  ]),
  methods: {
    toggleRead() {
      this.likePost = !this.likePost
    },
    toggleComment() {
      this.commentPost = !this.commentPost
    }
  }
}


</script>

<style lang="scss">
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
    background: none;
    border: none;
    .selected {
      color: orangered;
    }
  }
}

</style>