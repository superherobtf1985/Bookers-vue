<template>
  <div class="row">
    <h2>Books</h2>
    <table class="table table-hover table-inverse">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Opinion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, key) in books" :key="key">
          <td></td>
          <td><router-link to="/">{{ book.title }}</router-link></td>
          <td>{{ book.body }}</td>
        </tr>
      </tbody>
    </table>
    <Form></Form>
  </div>
</template>

<script>
  import firebase from '@/plugin/firebase'
  import Form from '@/components/Form'

  export default {
    name: 'Book',
    components: {
      Form
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
    },
    data() {
      return {
        book: null,
        db: null,
        books: {},
      }
    },
  }
</script>
