<template>
  <div id="app">
    <header class="navbar navbar-dark bg-dark">
      <div class="container">
        <nav>
          <span class="user-name">{{ user.email }}</span>
        </nav>
        <nav v-if="user.uid" key="login">
          <ul>
            <li class="nav-item"><router-link to="/users" class="nav-link">User</router-link></li>
            <li class="nav-item"><router-link to="/books" class="nav-link">Book</router-link></li>
            <li class="nav-item"><a @click="doLogout" class="nav-link logout" style="color:#007bff;">Logout</a></li>
          </ul>
        </nav>
        <nav v-else key="logout">
          <ul>
            <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
            <li class="nav-item"><router-link to="/about" class="nav-link">About</router-link></li>
            <li class="nav-item"><router-link to="/signin" class="nav-link">Login</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import firebase from '@/plugin/firebase';
export default {
  data() {
    return {
      user: {},
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
        this.user = user ? user : {}
    })
  },
  methods: {
    doLogout() {
      firebase.auth().signOut()
    },
  }
}
</script>

<style>
  * {
    margin: 0;
    box-sizing: border-box;
  }
  nav > ul {
    list-style: none;
  }
  nav > ul > li {
    display: inline-block;
  }
  .user-name {
    color: white;
  }
  .logout {
    cursor: pointer;
  }
  .router-link-exact-active {
    color: deeppink;
  }
  footer .row {
    text-align: right;
  }
</style>
