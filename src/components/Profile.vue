<template>
  <div class="profile">
    <h2>User Info</h2>
    <table class="table">
      <tbody>
        <tr>
          <th><img :src="placeholder" class="profile_image"></th>
        </tr>
        <tr>
          <th>id</th>
          <th>{{ user.uid }}</th>
        </tr>
        <tr>
          <th>email</th>
          <th>{{ user.email }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import firebase from '@/plugin/firebase'
  export default {
    data() {
      return {
        email: null,
        uid: null,
        placeholder: require("../assets/kitten.jpg")
      }
    },
    props: ["user"],
    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email;
          this.uid = user.uid;
        }
      })
    },
  }
</script>

<style>
.profile_image {
  width: 100px;
  height: 100px;
}
</style>

