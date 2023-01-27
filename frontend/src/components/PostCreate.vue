<template>
  <main class="post">
    <h1>Create a post</h1>
    <div class="create-form">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="title">
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea class="form-control" id="content" rows="8" v-model="content"></textarea>
      </div>
      <div class="mb-3">
        <label for="contentImgUrl" class="form-label">Upload file</label>
        <input
          class="form-control"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="contentImgUrl"
          name="file"
          @change="uploadContetnImg"
        >
      </div>
      <div class="mb-3" v-if="contentImgUrl">
        <img :src="contentImgUrl" alt="image preview" width="250"/>
      </div>

      <p class="error" v-if="errors.length">
        <b>Please fill up the following field(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error.index">{{ error }}</li>
        </ul>
      </p>

      <button class="form-btn" type="button" @click="createPost">Post</button>
    </div>
  </main>
</template>

<script>

export default {
  name: "PostCreate",
  data: function() {
    return {
      errors: [],
      title: "",
      content: "",
      contentImgUrl: "",
      file: "",
      userId: "",
    }
  },
  methods: {
    uploadContetnImg(event) {
      this.file = event.target.files[0]
      this.filePreview()
    },
    filePreview() {
      const reader = new FileReader();
      reader.onload = event => {
        console.log(event.target)
        this.contentImgUrl = event.target.result;
      }
      reader.readAsDataURL(this.file);
    },
    checkUserForm() {
      this.errors = []

      if (!this.title) {
        this.errors.push("Title");
      }
      if (!this.content) {
        this.errors.push("Content");
      }
      if (!this.errors.length) {
        return true;
      }
    },
    createPost() {
      if (this.checkUserForm() === true) {
        return this.$store.dispatch("createSinglePost", {
          title: this.title,
          content: this.content,
          file: this.file
        }).then(
          () => {
            console.log("Post created successfully!");
            this.$router.push("/posts");
          }
        )
      } else {
        console.log("Found input errors!");
      }
    }
  }
}

</script>

<style lang="scss">
.post {
  width: calc(90% - 80px);
  padding: 40px;
  @media screen and (max-width: 760px) {
    width: 100%;
    padding: 20px;
  }
}

.form-btn {
  display: block;
  margin: 40px auto;
  width: 80px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  font-weight: 700;
  &:hover {
    background-color: orangered;
    color: white;
    border: none;
  }
}

.error {
  margin-top: 20px;
  color: orangered;
}

</style>