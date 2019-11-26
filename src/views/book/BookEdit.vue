<template>
  <div class="row">
    <form @submit.prevent="editBook">
      <h1>Editing Book</h1>
      <p v-if="isInvalidTitle" style="color: orange;">
        {{ titleMessage }}
      </p>
      <p v-if="isInvalidBody" style="color: orange;">
        {{ bodyMessage }}
      </p>
      <div class="field row">
        <label for="book_title" class="col-2">Title</label>
        <input type="text" id="book_title" v-model="title">
        <p :class="{ red: isInvalidTitle }" class="col-2">{{ title.length }} / 10</p>
      </div>
      <div class="field row">
        <label for="book_body" class="col-2">Body</label>
        <input type="text" id="book_body" v-model="body">
        <p :class="{ red: isInvalidBody }" class="col-2">{{ body.length }} / 20</p>
      </div>
      <div class="actions row">
        <input type="submit" value="Update Book" class="btn btn-primary col-9">
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '@/plugin/firebase'

export default {
  name: 'BookEdit',
  props: ['book'],
  data() {
    return {
      title: "",
      body: "",
      isInvalidTitle: false,
      isInvalidBody: false,
      titleMessage: "タイトルが長すぎます",
      bodyMessage: "本文が長すぎます",
    }
  },
  methods: {
    editBook() {
      if (this.title === '' || this.body === '' || this.isInvalidTitle || this.isInvalidBody) { return }
      let bookDocRef = firebase.firestore().collection('books').doc(this.book)
      bookDocRef.update({
        title: this.title,
        body: this.body,
        uid: this.book.uid
      })
      alert('edit book!!')
      this.title= ""
      this.body = ""
    }
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
