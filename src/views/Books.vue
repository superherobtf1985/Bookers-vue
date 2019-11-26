<template>
  <div class="row">
    <div class="col-5">
      <Profile :user="user"></Profile>
      <Form :uid="user.uid"></Form>
    </div>
    <div class="col-7">
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
    name: 'Books',
    components: {
      Form,
      Profile,
    },
    data() {
      return {
        book: null,
        books: {},
        user: {},
      }
    },
    created() {
      this.book = firebase.firestore().collection('books')
      this.book.onSnapshot(querySnapshot => {
        const obj = {}
        querySnapshot.forEach(doc => {
          obj[doc.id] = doc.data()
        })
        this.books = obj
      })
      let self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.user = user
        }
      });
    },
    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push("books", () => {}, () => {});
        } else{
          this.$router.push("signin", () => {}, () => {});
        }
      })
    },
  }
</script>
