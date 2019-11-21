<template>
  <div id="app">
    <header class="header">
      <!-- ログイン時にはフォームとログアウトボタンを表示 -->
      <div v-if="user.uid" key="login">
        [{{ user.displayName }}]
        <button type="button" @click="doLogout">ログアウト</button>
      </div>
      <!-- 未ログイン時にはログインボタンを表示 -->
      <div v-else key="logout">
        <button type="button" @click="doLogin">ログイン</button>
      </div>
    </header>
  </div>
</template>

<script>
// firebase モジュール
import firebase from '@/plugin/firebase';
export default {
  data() {
    return {
      user: {},  // ユーザー情報
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    })
  },
  methods: {
    // ログイン処理
    doLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut()
    },
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    },
  }
}
</script>

<style>
  * {
    margin: 0;
    box-sizing: border-box;
  }
  .header {
    background: #3ab383;
    margin-bottom: 1em;
    padding: 0.4em 0.8em;
    color: #fff;
  }
</style>
