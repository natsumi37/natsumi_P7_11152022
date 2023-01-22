<template>
  <main class="post">
    <h1>Our employees</h1>
    <div class="display-employees">
      <div class="card" v-for="user in users" v-bind:key="user.user_id"> <!-- style="width: calc(25% - 20px);"-->
        <img class="card-img-top" v-if="user.profilePicUrl" :src="user.profilePicUrl" :alt="'profile picture of ' + user.firstName + ' ' + user.lastName">
        <img class="card-img-top" v-else src="../../public/profile-no-image.png" :alt="'no image of ' + user.firstName + ' ' + user.lastName">
        <div class="card-body">
          <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
          <p class="card-text">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "EmployeesAll",
  data: function() {
    return {
    }
  },
  computed: {
    ...mapState({
      users: "allUsers",
    })
  },
  beforeMount(){
    this.getAllUsers()
  },
  methods: {
    getAllUsers() {
      return this.$store.dispatch("getAllUsers");
    }
  }
}

</script>

<style lang="scss" scoped>
.post {
  width: 100%;
  padding: 40px;
}

.display-employees {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  @media screen and (max-width: 450px) {
    justify-content: center;
  }
}

.card {
  width: calc(33% - 20px);
  object-fit: cover;
  align-items: stretch;
  @media screen and (max-width: 895px) {
    width: calc(50% - 20px);
  }
  @media screen and (max-width: 450px) {
    width: 90%;
  }
}

</style>