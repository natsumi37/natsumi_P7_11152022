<template>
  <div class="form-signup">
    <h2 class="form-header">login</h2>

    <div class="mb-2">
      <label for="loginEmail" class="form-label">Email address</label>
      <input type="email" class="form-control" id="loginEmail" v-model="loginEmail" placeholder="example@groupomania" required>
      <span class="errorMessage" v-if="error=true">Input error</span>
    </div>
    <div class="mb-2">
      <label for="loginPassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="loginPassword" v-model="loginPassword" required>
      <span class="errorMessage" v-if="error=true">Input error</span>
    </div>

    <router-link to="/posts"><button class="form-btn" type="submit" @click="userLogin">Login</button></router-link>
  </div>
</template>

<script>

export default {
  name: "UserLogin",
  data: function() {
    return {
      loginEmail: "",
      loginPassword: ""
    }
  },
  methods: {
    async post(input) {
      try {
        const url = "https://localhost:3000/"
        const response = await fetch (url + "auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input)
        })
        const data = await response.json()
        console.log(data)
      } catch(error) {
        console.log(error)
      }
      // window.location.href = "contents"
    },
    checkUserInput() {
      let error = false
      if (!this.loginEmail.value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        error = true
      }
      if (!this.loginPassword.value) {
        error = true
      }
      return error
    },
    userLogin() {
      const user = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      console.log(user)
      this.post(user)
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

.errorMessage {
  color: orangered;
}


</style>