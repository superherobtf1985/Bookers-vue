<template>
  <div class="row">
    <div class="col-5">
      <Profile :user="userRef"></Profile>
      <Form :uid="book.uid"></Form>
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
          <tr>
            <td></td>
            <td>{{ book.title }}</td>
            <td>{{ book.body }}</td>
            <td v-if="isCurrentUser">
              <router-link
              tag="button"
              :to="{
                name: 'BookEdit',
                params: { book: book }
              }"
              class="btn btn-primary">Edit</router-link>
            </td>
            <td v-if="isCurrentUser">
              <button class="btn btn-danger" @click="deleteBook">Delete</button>
            </td>
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
  name: 'Book',
  components: {
    Form,
    Profile,
  },
  props: ['id'],
  data() {
    return {
      book: {},
      db: null,
      current_uid: null,
      isCurrentUser: false,
      userRef: {},
    }
  },
  created() {
    this.db = firebase.firestore()
    let bookDocRef = this.db.collection('books').doc(this.id)
    bookDocRef.get().then((doc) => {
      this.book = doc.data()
      var self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.isCurrentUser = (user.uid == self.book.uid) ? true : false
        }
      });
      this.db.collection('users').doc(this.book.uid).get()
      .then(doc => {
        self.userRef = doc.data()
      })
    })
  },
  methods: {
    deleteBook: function() {
      this.db.collection("books").doc(this.id).delete()
      .then(function() {
        alert("book successfully deleted!");
      }).catch(error => {
        alert(error.message)
      });
    }
  }
}
</script>
