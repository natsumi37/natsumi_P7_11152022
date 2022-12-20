<template>
  <main class="post"> <!-- how to apply semantic tags in vue-->
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
        <label for="contentImg" class="form-label">Upload files</label>
        <input class="form-control" type="file" id="contentImg" @change="uploadContentImg">
      </div>

      <button class="form-btn" type="submit" @click="createPost">Post</button>
    </div>
  </main>
</template>

<script>

export default {
  name: "PostCreate",
  data: function() {
    return {
    }
  },
  methods: {
    getUrl() {
      const param = new URLSearchParams(window.location.search)
      const postId = param.get("id")
      const url = "https://localhost:3000/"
      return url + postId
    },
    async getPost() {
      const url = this.getUrl()
      try {
        // wonder if the function "getUrl()" can be here or not
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
      } catch(error) {
        console.log(error)
      }
    },
    uploadContentImg(event) {
      const file = event.target.files[0]
      this.createContentImg(file)
    },
    createContentImg(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.contentImg = reader.result
      }
    },
    async post(post) {
      try {
        const url = "https://localhost:3000/"
        const response = await fetch (url + "posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post)
        })
        const data = await response.json()
      } catch(error) {
        console.log(error)
      }
      // window.location.href = "posts"
    },
    createPost() {
      const postObj = {
        title: this.title,
        content: this.content,
        contentImg: this.contentImg
      }
      console.log(postObj)
      this.post(postObj)
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

</style>