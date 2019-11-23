<template>
  <div class="row">
    <div class="col-5">
      <Profile></Profile>
      <Form></Form>
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
            <td><button class="btn btn-primary">Edit</button></td>
            <td><button class="btn btn-danger">Delete</button></td>
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
      user: null,
      db: null,
      users: {},
    }
  },
  created() {
    this.db = firebase.firestore()
    let bookDocRef = this.db.collection('books').doc(this.id)
    bookDocRef.get().then((doc) => {
      this.book = doc.data()
      this.book.book_id = doc.id
    })
  },
}
</script>
