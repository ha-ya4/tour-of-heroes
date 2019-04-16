<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <!--<vtoh-heroes />-->
    <div id="nav">
      <router-link to="dashboard">Dashboard</router-link>
      <router-link to="heroes">Heroes</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'tour-of-heroes'
    }
  }
  /*
  変更により未使用。メモとして残す。

  // 子コンポーネントに渡すためのServiceを初期化
  created () {
    this.service.messages = new MessageService()
    this.service.hero = new HeroService(this.service.messages)

    // リダイレクトするときにデータを渡したいので、'/'のときに手動でリダイレクト
    if (this.$route.path === '/') {
      this.$router.push({ name: 'dashboard', params: { heroService: this.service.hero } })
    }
  }
  */
}
</script>

<style>
h1 {
  color: #369;
  font-family: Arial, Helvetica, sansserif;
}

h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sansserif;
}

body {
  margin: 2em;
}

body, input[type="text"], button {
  color: #888;
  font-family: Cambria, Georgia;
}

/* everywhere else */
* {
  font-family: Arial, Helvetica, sansserif;
}
</style>
