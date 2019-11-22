<template>
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
        db: null,
        book: null,
      }
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
    created() {
      this.db = firebase.firestore()
      this.book = this.db.collection('books')
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
