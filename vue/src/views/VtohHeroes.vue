<template>
  <div class="vtoh-heroes">
    <!--ヒーロー追加-->
    <div>
      <label>Hero name
        <input type="text" v-model="heroName">
      </label>
      <button @click="add()">
        add
      </button>
    </div>
    <!--ヒーローリスト-->
    <h2>MyHeroes</h2>
    <ul class="heroes">
      <li v-for="hero in heroes" :key="hero.id">
        <router-link :to="{name: 'detail', params: {id: hero.id}}">
          <span class="badge">{{ hero.id}}</span> {{ hero.name }}
        </router-link>
        <button class="delete" title="delete hero"
          @click="del(hero)">x</button>
      </li>
    </ul>
    <!--メッセージ-->
    <vtoh-message :messageService="service.message"/>
  </div>
</template>

<script>
import VtohMessage from '@/views/VtohMessage.vue'

import MessageService from '@/other/message-service.js'
import HeroService from '@/other/hero-service.js'

export default {
  components: {
    VtohMessage
  },

  data () {
    return {
      heroes: [],
      heroName: '',
      service: {
        message: Object,
        hero: Object
      }
    }
  },

  methods: {
    // 新しいヒーローを追加
    async add () {
      // 空白ならリターン
      if (!this.heroName) { return }
      await this.service.hero.addHero(this.heroName).then(hero => {
        this.heroes.push(hero.data)
      })
    },

    // ヒーローの削除
    async del (hero) {
      // クライアント側のリストから選択されたヒーローを除外する
      this.heroes = this.heroes.filter(h => h !== hero)
      // サーバー側のリストからも削除
      await this.service.hero.deleteHero(hero).then()
    }
  },

  async created () {
    this.service.message = new MessageService()
    this.service.hero = new HeroService(this.service.message)

    await this.service.hero.getHeroes().then(heroes => {
      this.heroes = heroes.data
    })
  }
}
</script>

<style scoped>
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}

.heroes li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #607D8b;
  background-color: #DDD;
  left: .1em;
}

.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}

.heroes a:hover {
  color: #607D8B
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  min-width: 16px;
  text-align: right;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  font-family: Arial;
}

button:hover {
  background-color: #cfd8dc
}

button.delete {
  position: relative;
  left: 194px;
  top: -32px;
  background-color: gray !important;
  color: white;
}
</style>
