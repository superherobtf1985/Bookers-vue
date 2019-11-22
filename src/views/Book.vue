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
          <td>{{ book.title }}</td>
          <td>{{ book.body }}</td>
        </tr>
      </tbody>
    </table>

    <form id="app" @submit.prevent="addBook">
      <p v-if="isInvalidTitle" style="color: orange;">
        {{ titleMessage }}
      </p>

      <p v-if="isInvalidBody" style="color: orange;">
        {{ bodyMessage }}
      </p>
      <div class="field row">
        <label for="book_title">Title</label>
        <input type="text" id="book_title" v-model="title">
        <p :class="{ red: isInvalidTitle }">{{ title.length }} / 10</p>
      </div>

      <div class="field row">
        <label for="book_body">body</label>
        <input type="text" id="book_body" v-model="body">
        <p :class="{ red: isInvalidBody }">{{ body.length }} / 20</p>
      </div>

      <div class="actions row">
        <input type="submit" value="Create Book" class="btn btn-primary col-xs-12">
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from '@/plugin/firebase'
  export default {
    name: 'Book',
    data() {
      return {
        title: "",
        body: "",
        isInvalidTitle: false,
        isInvalidBody: false,
        titleMessage: "タイトルが長すぎます",
        bodyMessage: "本文が長すぎます",
        book: null,
        db: null,
        books: {},
      }
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
    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('login!!');
          this.$router.push("books", () => {}, () => {});
        } else{
          this.$router.push("signin", () => {}, () => {});
        }
      })
    },
    methods: {
      addBook() {
        if (this.title === '' || this.body === '' || this.isInvalidTitle || this.isInvalidBody) { return }
        this.book.add({
          title: this.title,
          body: this.body,
        })
        this.title= ""
        this.body = ""
      },
    },
    watch: {
      title: function(newValue) {
        this.isInvalidTitle = newValue.length > 10 ? true : false;
      },
      body: function(newValue) {
        this.isInvalidBody = newValue.length > 20 ? true : false;
      },
    }
  }
</script>
