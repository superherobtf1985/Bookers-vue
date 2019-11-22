<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="email" placeholder="Email" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from '@/plugin/firebase'
export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('login!!');
        this.$router.push("books", () => {}, () => {});
      } else{
        this.$router.push("signin", () => {}, () => {});
      }
    })
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        res => {
          alert('Success!')
          console.log(res)
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
