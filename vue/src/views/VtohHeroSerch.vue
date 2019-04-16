<template>
  <div id="vtoh-hero-serch">
    <h4>Hero Serch</h4>

    <input id="serch-box" v-model="serchWord">

    <ul clas="serch-result">
      <li v-for="hero in heroes" :key="hero.id">
        <!--HeroDetailへのルーティング-->
        <router-link :to="{name: 'detail', params: {id: hero.id}}">
          {{ hero.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heroes: [],
      serchWord: '',
      previousWord: ''
    }
  },

  props: [
    'heroService'
  ],

  methods: {
    // this.heroesを検索して返ってくるheroesにする
    async serch () {
      await this.heroService.serchHeroes(this.serchWord).then(res => {
        this.heroes = res.data
      })
    }
  },

  // watchでthis.wordを監視、変更があるたびにserchメソッドを実行
  watch: {
    serchWord () {
      // 検索後が入力されてから一定時間待つ
      setTimeout(() => {
        // 前回の検索後と違うときだけ検索する
        if (this.previousWord !== this.serchWord) {
          this.serch()
          // 今検索したwordをthis.previousWordとする
          this.previousWord = this.serchWord
        }
      }, 500)
    }
  }
}
</script>

<style scoped>
.search-result li {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  width: 195px;
  height: 16px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  list-style-type: none;
}

.search-result li:hover {
  background-color: #607D8B;
}

.search-result li a {
  color: #888;
  display: block;
  text-decoration: none;
}

.search-result li a:hover {
  color: white;
}
.search-result li a:active {
  color: white;
}
#search-box {
  width: 200px;
  height: 20px;
}

ul.search-result {
  margin-top: 0;
  padding-left: 0;
}
</style>
