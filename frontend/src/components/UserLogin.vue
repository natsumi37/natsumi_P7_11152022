<template>
  <div class="form-signup">
    <h2 class="form-header">login</h2>

    <div class="mb-2">
      <label for="loginEmail" class="form-label">Email address</label>
      <input type="email" class="form-control" id="loginEmail" v-model="email" placeholder="example@groupomania" required>
    </div>
    <div class="mb-2">
      <label for="loginPassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="loginPassword" v-model="password" required>
    </div>

    <p class="error" v-if="errors.length">
      <b>Please correct the following field(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.index">{{ error }}</li>
      </ul>
    </p>

    <!-- <router-link to="/posts"> -->
      <button class="form-btn" type="button" @click="login">Login</button>
    <!-- </router-link> -->
  </div>
</template>

<script>

export default {
  name: "UserLogin",
  data: function() {
    return {
      errors: [],
      email: "",
      password: ""
    }
  },
  methods: {
    checkUserForm() {
      this.errors = [];

      if (!this.email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        this.errors.push("Email")
      }
      if (!this.password) {
        this.errors.push("Password")
      }
      if (!this.errors.length) {
        return true
      }
    },
    login() {
      if (this.checkUserForm() === true) {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        }).then(
          () => {
            this.$router.push("/posts")
            console.log(this.$store.state.auth)
          }
        ).catch(
          (error) => {
            throw error
          }
        );
      } else {
        console.log("Found input errors!")
      }
    }
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

.error {
  margin-top: 20px;
  color: orangered;
}

</style>