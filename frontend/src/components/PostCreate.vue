<template>
  <main class="post">
    <h1>Create a post</h1>
    <form method="post" enctype="multipart/form-data">
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
            name="contentImgUrl"
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
    </form>
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
      userId: "",
    }
  },
  methods: {
    uploadContetnImg(event) {
      const file = event.target.files[0]
      this.createContentImg(file)
      console.log(file)
      console.log("this.contentImgUrl", this.contentImgUrl)
    },
    createContentImg(file) {
      const reader = new FileReader();
      reader.onload = event => {
        console.log(event.target)
        this.contentImgUrl = event.target.result;
        // const encodedFile = dataUrl.replace("data:*/*;base64,", "");
        // this.contentImgUrl = encodedFile;
        // console.log("encodedfile: ", encodedFile)
      }
      reader.readAsDataURL(file);
    },
    // uploadContentImgUrl(event) {
    //   const file = event.target.files[0]
    //   this.createContentImgUrl(file)
    // },
    // createContentImgUrl(file){
    //   const reader = new FileReader()
    //   reader.readAsDataURL(file)
    //   reader.onload = () => {
    //     this.contentImgUrl = reader.result
    //     console.log("createContentImgUrl", this.contentImgUrl)
    //   }
    // },
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
          contentImgUrl: this.contentImgUrl,
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
  width: 100%;
  padding: 40px;
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