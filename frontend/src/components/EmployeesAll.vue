<template>
  <div class="post">
    <h1>Our employees</h1>
    <div class="display-employees">
      <div class="card" style="width: calc(25% - 20px);"  v-for="user in users" v-bind:key="user.user_id">
        <img  class="card-img-top" :src="user.profilePicUrl" :alt="'profile picture of ' + user.firstName + ' ' + user.lastName">
        <div class="card-body">
          <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
          <p class="card-text">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
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

<style lang="scss">
.post {
  width: 100%;
  padding: 40px;
}

.display-employees {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

</style>