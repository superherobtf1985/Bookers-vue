<template>
  <div class="row">
    <div class="col-5">
      <Profile></Profile>
      <Form></Form>
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
          <tr v-for="(book, key) in books" :key="key">
            <td></td>
            <td><router-link to="/">{{ book.title }}</router-link></td>
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
    name: 'Books',
    components: {
      Form,
      Profile,
    },
    created() {
      this.db = firebase.firestore()
      this.book = this.db.collection('books')
      this.book.onSnapshot(querySnapshot => {
        const obj = {}
        querySnapshot.forEach(doc => {
          obj[doc.id] = doc.data()
        })
        this.books = obj
      })
      this.user = this.db.collection('users')
      this.user.onSnapshot(querySnapshot => {
        const obj = {}
        querySnapshot.forEach(doc => {
          obj[doc.id] = doc.data()
        })
        this.users = obj
      })
    },
    data() {
      return {
        book: null,
        user: null,
        db: null,
        books: {},
        users: {},
      }
    },
  }
</script>
