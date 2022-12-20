<template>
  <SignupHeader></SignupHeader>
  <main>
    <SignupGreeting></SignupGreeting>
    <UserLogin></UserLogin>
  </main>
</template>

<script>
export default {
  name: "UserLoginView",
  components: {
    "SignupHeader": require("@/components/SignupHeader.vue").default,
    "SignupGreeting": require("@/components/SignupGreeting.vue").default,
    "UserLogin": require("@/components/UserLogin.vue").default
  }
}

</script>

<style lang="scss">

</style>