<template>
  <h1 class="greeting">Welcome to <span class="visually-hidden">Groupomania network</span></h1>
  <img class="greeting-logo" src="../assets/logo/icon-left-font-monochrome-black.png" alt="Groupomania logo">
</template>

<script>

</script>

<style lang="scss">
.greeting {
  margin: 30px auto 0;
  text-align: center;
  font-weight: 700;
  &-logo {
    display: block;
    width: 500px;
    height: 80px;
    object-fit: cover;
    margin: 0 auto;
  }
}
@media screen and (max-width: 550px) {
  .greeting-logo {
    width: 90%;
  }
}

</style>