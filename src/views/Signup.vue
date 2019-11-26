<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="email" placeholder="Email" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signUp">Register</button>
    <p>Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from '@/plugin/firebase'
export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password: '',
      user: null,
      db: null,
    }
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          alert("Create account!")
          let newUser = {
            uid: user.user.uid,
            email: this.username
          }
          firebase.firestore().collection('users').doc(user.user.uid).set(newUser)
          this.$router.push("books", () => {}, () => {});
        })
        .catch(error => {
          alert(error.message)
        })
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
.signup {
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
