<template>
  <form id="app" @submit.prevent="addBook" style="margin-left: 0;">
    <h2>New book</h2>
    <p v-if="isInvalidTitle" style="color: orange;">
      {{ titleMessage }}
    </p>

    <p v-if="isInvalidBody" style="color: orange;">
      {{ bodyMessage }}
    </p>
    <div class="field row">
      <label for="book_title" class="col-2">Title</label>
      <input type="text" id="book_title" v-model="title" class="col-6">
      <p :class="{ red: isInvalidTitle }" class="col-2">{{ title.length }} / 10</p>
    </div>

    <div class="field row">
      <label for="book_body" class="col-2">body</label>
      <input type="text" id="book_body" v-model="body" class="col-6">
      <p :class="{ red: isInvalidBody }" class="col-2">{{ body.length }} / 20</p>
    </div>

    <div class="actions row">
      <input type="submit" value="Create Book" class="btn btn-primary col-9">
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
    props: ['uid'],
    created() {
      this.db = firebase.firestore()
      this.book = this.db.collection('books')
    },
    methods: {
      addBook() {
        if (this.title === '' || this.body === '' || this.isInvalidTitle || this.isInvalidBody) { return }
        this.book
        .add({
          title: this.title,
          body: this.body,
          uid: this.uid,
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

<style>
  .field {
    margin: 10px 0;
  }
</style>
