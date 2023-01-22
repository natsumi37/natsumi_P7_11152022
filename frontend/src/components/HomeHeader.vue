<template>
  <header class="header-box">
    <img class="header-logo" src="@/assets/logo/icon-left-font-monochrome-white.png" alt="Groupomania logo">
    <img class="header-profile-pic" v-if="loggedinUser.profilePicUrl" :src="loggedinUser.profilePicUrl" :alt="'profile picture of ' + loggedinUser.firstName + ' ' + loggedinUser.lastName">
    <img class="header-profile-pic" v-else src="../../public/profile-no-image-icon.png" :alt="'no profile image of ' + loggedinUser.firstName + ' ' + loggedinUser.lastName">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" color="white" style="font-size: 25px" />
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><button class="dropdown-item" @click="logout">Logout</button></li>
            <li><button class="dropdown-item" @click="deleteAccount">Delete Account</button></li>
          </ul>
        </li>
      </ul>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  data: function() {
    return {
    }
  },
  computed: {
    ...mapState([
      "auth", "loggedinUser"
    ]),
    ...mapGetters({
    }),
  },
  methods: {
    logout() {
      return this.$store.dispatch("logout").then(
        () => {
          console.log("User Logged out!")
          this.$router.push("/login")
        }
      ).catch(
        (error) => {
          throw error
        }
      )
    },
    deleteAccount() {
      return this.$store.dispatch("deleteAccount").then(
        () => {
          console.log("User deleted!")
          this.$router.push("/")
        }
      ).catch(
        (error) => {
          throw error
        }
      )
    }
  }
}

</script>

<style lang="scss">
.header {
  &-box {
    background-color: orangered;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    @media screen and (max-width: 320px) {
      padding: 0 10px;
    }
  }
  &-logo {
    width: 200px;
    height: 70px;
    margin-right: auto;
    object-fit: cover;
    @media screen and (max-width: 320px) {
      width: 65%;
      margin-right: 5px;
    }
  }
  &-profile-pic {
    width: 50px;
    height: 50px;
    // border: white solid 1px;
    border-radius: 50%;
    margin-left: auto;
    // object-fit: cover;
    z-index: 5;
    margin-right: 10px;
  }
}

</style>