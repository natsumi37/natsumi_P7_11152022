<template>
  <div class="form-signup">
    <h2 class="form-header">Signup</h2>

    <div class="mb-2">
      <label for="firstName" class="form-label">First Name</label>
      <input type="text" class="form-control" id="firstName" v-model="firstName" required>
      <span class="errorMessage" v-if="error=true">Input error</span>
    </div>
    <div class="mb-2">
      <label for="lastName" class="form-label">Last Name</label>
      <input type="text" class="form-control"  id="lastName" v-model="lastName" required>
      <span class="errorMessage" v-if="error=true">Input error</span>
    </div>
    <div class="mb-2">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control"  id="email" v-model="email" placeholder="example@groupomania.com" required>
      <span class="errorMessage" v-if="error=true">Input error</span>    
    </div>
    <div class="mb-2">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required>
      <span class="errorMessage" v-if="error=true">Input error</span>
    </div>
    <div class="mb-2">
      <label for="profilePicUrl" class="form-label">Profile picture</label>
      <input 
        type="file"
        class="form-control"
        id="profilePicUrl"
        accept=".jpg, .jpeg, .png"
        @change="uploadProfilePic"
      />
      <span class="errorMessage" v-if="error=true">Input error</span>
    </div>

    <router-link to="/posts"><button class="form-btn" type="submit" @click="userSignup">Signup</button></router-link>
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService'

export default {
  name: "UserSignup",
  data: function() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicUrl: "",
    }
  },
  methods: {
    uploadProfilePic(event) {
      const file = event.target.files[0]
      this.createProfilePic(file)
    },
    createProfilePic(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.profilePicUrl = reader.result
      }
    },
    checkUserInput() {
      let error = false

      if (!this.firstName.value.match(/^[A-Za-z]*$/)) {
        error = true
      }
      if (!this.lastName.value.match(/^[A-Za-z]*$/)) {
        error = true
      }
      if (!this.email.value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        error = true
      }
      if (!this.password.value) {
        error = true
      }
      if (!this.profilePicUrl.value) {
        error = true
      }
      return error
    },
    async createUser() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        profilePicUrl: this.profilePicUrl
      };

      UserDataService.create(data).then(
        (res) => {
          this.user = res.data;
          console.log(res.data);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    // async post(input) {
    //   try {
    //     const url = "https://localhost:3000/"
    //     const response = await fetch (url + "auth/signup", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(input)
    //     })
    //     const data = await response.json()
    //     console.log(data)
    //   } catch(error) {
    //     console.log(error)
    //   }
    //   // window.location.href = "contents"
    // },
    // userSignup() {
    //   const user = {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     email: this.email,
    //     password: this.password,
    //     profilePic: this.profilePic
    //   }
    //   console.log(user)
    //   this.post(user)
    // }
  }
}

</script>

<style lang="scss">
.form {
  &-signup {
    width: 75%; /* need responsive */
    margin: 20px auto;
    a {
      text-decoration: none;
    }
  }
  &-header {
    text-align: center;
    color: orangered;
    font-weight: 700;
  }
  &-btn {
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
}

.errorMessage {
  color: orangered;
}

</style>