<template>
  <nav class="nav-container fixed-bottom">
    <ul class="nav-items">
      <router-link to="/posts">
        <li title="See all posts">
          <p>Home</p>
          <font-awesome-icon icon="fa-solid fa-house" />
        </li>
      </router-link>
      <router-link to="/posts/create">
        <li title="Create a post">
          <p>Post</p>
          <font-awesome-icon icon="fa-solid fa-pencil" />
        </li>
      </router-link>
      <router-link to="/posts/unread">
        <li title="See unread posts">
          <p>Unread</p>
          <font-awesome-icon icon="fa-solid fa-envelope" />
          <p class="notification" v-if="countUnreadPosts > 0">{{ countUnreadPosts }}</p>
        </li>
      </router-link>
      <router-link to="/employees">
        <li title="See our network">
          <p>Network</p>
          <font-awesome-icon icon="fa-regular fa-face-smile" />
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  computed:
  mapState([
    "posts"
  ]),
  ...mapGetters([
    "getUnreadPosts",
    "countUnreadPosts"
  ]),
}



</script>

<style lang="scss">
p {
  margin: 0;
}

.nav-container {
  width: 350px;
  position: sticky;
  background-color: rgb(242, 240, 240);
}

.nav-items {
  display: flex;
  flex-direction: column;
  font-size: large;
  font-weight: 700;
  padding: 30px 10px;
  list-style-type: none;
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    &:hover {
      background-color: lightgray;
    }
    a {
      text-decoration: none;
    }
    .notification {
      width: 15px;
      height: 15px;
      border: solid 3px red;
      border-radius: 50%;
      padding: 3px;
    }
  }
  a {
  text-decoration: none;
  color: inherit;
  }
}

@media screen and (max-width: 760px) {
  p {
    display: none;
  }
  .nav-container {
    width: 100%;
    margin-top: auto;
  }
  .nav-items {
    flex-direction: row;
    justify-content: space-evenly;
    font-size: x-large;
  }
}

</style>