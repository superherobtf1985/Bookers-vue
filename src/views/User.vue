<template>
  <div class="user">
    <h1>This is an user page</h1>
  </div>
</template>

<script>
import firebase from '@/plugin/firebase'
export default {
  name: 'User',
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('login!!');
        this.$router.push("/", () => {}, () => {});
      } else{
        this.$router.push("signin", () => {}, () => {});
      }
    })
  },
}
</script>
