<template>
  <div class="row">
    <div class="col-5">
      <Profile></Profile>
      <Form :uid="current_uid"></Form>
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
              <button class="btn btn-primary">Edit</button>
            </td>
            <td v-if="isCurrentUser">
              <button class="btn btn-danger">Delete</button>
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
      book: null,
      db: null,
      current_uid: null,
      isCurrentUser: false,
    }
  },
  created() {
    let self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.current_uid = user.uid
      }
    });
    this.db = firebase.firestore()
    let bookDocRef = this.db.collection('books').doc(this.id)
    bookDocRef.get().then((doc) => {
      this.book = doc.data()
      this.isCurrentUser = this.current_uid === this.book.uid ? true : false
    })
  },
}
</script>
