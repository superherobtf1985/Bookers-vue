<template>
  <div class="row">
    <div class="col-5">
      <Profile :user="user"></Profile>
      <Form :uid="user.uid"></Form>
    </div>
    <div class="col-7">
      <h2>Users</h2>
      <table class="table table-hover table-inverse">
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, key) in users" :key="key">
            <td></td>
            <td>{{ user.email }}</td>
            <td><router-link :to="{ name: 'User', params: {id: key}}">Show</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import firebase from '@/plugin/firebase'
  import Form from '@/components/Form'
  import Profile from '@/components/Profile'

  export default {
    name: 'Users',
    components: {
      Form,
      Profile,
    },
    data() {
      return {
        user: {},
        users: {},
      }
    },
    created() {
      this.user = firebase.firestore().collection('users')
      this.user.onSnapshot(querySnapshot => {
        const obj = {}
        querySnapshot.forEach(doc => {
          obj[doc.id] = doc.data()
        })
        this.users = obj
      })
      let self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.user = user
        }
      });
    },
  }
</script>
