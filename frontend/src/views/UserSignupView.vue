<template>
  <SignupHeader />
  <main>
    <SignupGreeting />
    <UserSignup />
  </main>
</template>

<script>
export default {
  name: "UserSignupView",
  components: {
    "SignupHeader": require("@/components/SignupHeader.vue").default,
    "SignupGreeting": require("@/components/SignupGreeting.vue").default,
    "UserSignup": require("@/components/UserSignup.vue").default
  }
}

</script>

<style lang="scss">

</style>