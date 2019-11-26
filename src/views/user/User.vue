<template>
  <div class="row">
    <div class="col-5">
      <Profile :user="userRef"></Profile>
      <Form :uid="user.uid"></Form>
    </div>
    <div class="col-7">
      <h2>Books</h2>
      <table class="table table-hover table-inverse">
        <thead>
          <tr>
            <th>image</th>
            <th>title</th>
            <th>opnion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, key) in books" :key="key">
            <td></td>
            <td>
              <router-link :to="{
                name: 'Book',
                params: { id: key }
              }">{{ book.title }}</router-link>
            </td>
            <td>{{ book.body }}</td>
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
  name: 'User',
  components: {
    Form,
    Profile,
  },
  props: ['id'],
  data() {
    return {
      user: {},
      books: {},
      users: {},
      userRef: {},
    }
  },
  created() {
    let self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.user = user
      }
    });
    firebase.firestore().collection('users').doc(this.id).get()
    .then(doc => {
      this.userRef = doc.data()
    })
    firebase.firestore().collection('books').where('uid', '==', this.id).get()
    .then(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.books = obj
    })
  },
}
</script>
