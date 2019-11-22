<template>
  <div id="app">
    <header class="header">
      <div v-if="user.uid" key="login">
        <div id="nav">
          [{{ user.email }}]
          <router-link to="/users">User</router-link> |
          <router-link to="/books">Book</router-link> |
          <a @click="doLogout">Logout</a>
        </div>
      </div>
      <div v-else key="logout">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/signin">Login</router-link>
        </div>
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
  .header {
    margin-bottom: 1em;
    padding: 0.4em 0.8em;
    color: #fff;
  }
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .router-link-exact-active {
    font-size: 30px;
    color: deeppink;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
