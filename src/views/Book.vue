<template>
  <!-- <form id="app" @submit.prevent="addBook">
    <transition-group name="chat" tag="div" class="list content">
      <section v-for="{ key, name, image, message } in chat" :key="key" class="item">
        <div class="item-image"><img :src="image" width="40" height="40"></div>
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <div>:text="message"></div>
          </div>
        </div>
      </section>
    </transition-group>

    <div class="field row">
      <label for="book_title">Title</label>
      <input type="text" id="book_title" class="col-xs-12 book_body" v-model="title">
      <p :class="{ red: isInvalidTitle }">{{ title.length }} / 10</p>
    </div>

    <div class="field row">
      <label for="book_body">body</label>
      <input type="text" id="book_body" class="col-xs-12 book_title" v-model="body">
      <p :class="{ red: isInvalidBody }">{{ body.length }} / 20</p>
    </div>

    <div class="actions row">
      <input type="submit" value="Create Book" class="btn btn-primary col-xs-12">
    </div>
  </form> -->
  <div class="book">
    <h1>This is an book page</h1>
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
        books: [],
      }
    },
    mounted () {
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
        if (this.isInvalidTitle || this.isInvalidBody || !this.title.length || !this.body.length) {
          return
        }
        this.books.push({
          title: this.title,
          body: this.body
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
