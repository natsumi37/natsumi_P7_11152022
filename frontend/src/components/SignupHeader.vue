<template>
  <header>
    <ul class="nav">
      <li class="nav-item">
        <button @click="switchSignupForm" class="btn-signup" type="button">Signup</button>
      </li>
      <li class="nav-item">
        <button @click="swithLoginForm" class="btn-signup" type="button">Login</button>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "SignupHeader",
  data: function() {
    return {
      signup: true
    }
  },
  methods: {
    switchSignupForm() {
      this.signup = true;
      this.$router.push("/");
    },
    swithLoginForm() {
      this.signup = false;
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: end;
  background-color: black;
  gap: 3px;
  width: 100%;
  margin: 0 auto 30px;
}

.btn-signup {
  width: 80px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  font-weight: 700;
  &:hover {
    background-color: orangered;
    color: white;
  }
}

</style>