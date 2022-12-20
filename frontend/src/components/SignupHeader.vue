<template>
  <header>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="routerLink" to="/"><button @click="signup = true" class="btn-signup" type="button">Signup</button></router-link>
      </li>
      <li class="nav-item">
        <router-link class="routerLink" to="/login"><button @click="signup = false" class="btn-signup" type="button">Login</button></router-link>
      </li>
    </ul>
  </header>
</template>

<script>

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