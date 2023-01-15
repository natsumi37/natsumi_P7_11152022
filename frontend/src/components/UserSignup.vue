<template>
  <div class="form-signup">
    <h2 class="form-header">Signup</h2>
    
    <div class="mb-2">
      <label for="firstName" class="form-label">First Name</label>
      <input type="text" class="form-control" id="firstName" v-model="firstName" required>
    </div>
    <div class="mb-2">
      <label for="lastName" class="form-label">Last Name</label>
      <input type="text" class="form-control"  id="lastName" v-model="lastName" required>
    </div>
    <div class="mb-2">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control"  id="email" v-model="email" placeholder="example@groupomania.com" required>
    </div>
    <div class="mb-2">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required>
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
    </div>

    <p class="error" v-if="errors.length">
      <b>Please correct the following field(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.index">{{ error }}</li>
      </ul>
    </p>

    <!-- <router-link to="/posts"> -->
      <button class="form-btn" type="button" @click="signup">Signup</button>
    <!-- </router-link> -->
  </div>
</template>

<script>
export default {
  name: "UserSignup",
  data: function() {
    return {
      errors: [],
      isSignup: false,
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
    checkUserForm() {
      this.errors = [];

      if (!this.firstName || !this.firstName.match(/^[A-Za-z]*$/)) {
        this.errors.push("First Name");
      }
      if (!this.lastName || !this.lastName.match(/^[A-Za-z]*$/)) {
        this.errors.push("Last name");
      }
      if (!this.email || !this.email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        this.errors.push("Email");
      }
      if (!this.password) {
        this.errors.push("Password")
      }
      if (!this.errors.length) {
        return true;
      }
    },
    signup() {
      if (this.checkUserForm() === true) {
        return this.$store.dispatch("signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          profilePicUrl: this.profilePicUrl
        }).then(
          () => {
            console.log("User signup successfully!")
            this.$router.push("/login")
          }
        ).catch(
          (error) => {
            throw error
          }
        );
      } else {
        console.log("Found input errors!");
      }
      this.isSignup = true;
    }
  }
}

</script>

<style lang="scss">
.form {
  &-signup {
    width: 75%;
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

.error {
  margin-top: 20px;
  color: orangered;
}

</style>