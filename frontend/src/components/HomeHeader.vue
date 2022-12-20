<template>
  <header class="header-box">
    <img class="header-logo" src="@/assets/logo/icon-left-font-monochrome-white.png" alt="Groupomania logo">
    <img class="header-profile-pic" :src="users[0].profilePic" :alt="'profile picture of ' + userFullName">
  </header>
</template>

<script>
import { mapState } from "vuex"

export default {
  data: function() {
    return {

    }
  },
  computed: {
    ...mapState({
      users: state => state.users,
      userFullName: state => state.users.firstName + " " + state.users.lastName
    })
  }
}



</script>

<style lang="scss">
.header {
  &-box {
    background-color: orangered;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  &-logo {
    width: 200px;
    height: 70px;
    object-fit: cover;
    @media screen and (max-width: 320px) {
      width: 70%;
    }
  }
  &-profile-pic {
    width: 50px;
    height: 50px;
    border: white solid 1px;
    border-radius: 50%;
    object-fit: cover;
  }
}

</style>