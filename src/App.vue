<template>
  <div id="app">
    <header class="header">
      <div v-if="user.uid" key="login">
        [{{ user.email }}]
        <button type="button" @click="doLogout">ログアウト</button>
      </div>
      <div v-else key="logout">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/signin">ログイン</router-link>
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
    background: #3ab383;
    margin-bottom: 1em;
    padding: 0.4em 0.8em;
    color: #fff;
  }
</style>
