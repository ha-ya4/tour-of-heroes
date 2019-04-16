<template>
  <div class="vtoh-heroes-detail">
    <!--最初はundefinedなので、selectedHeroに値が入ったときだけ表示する-->
    <div v-if="hero">
      <h2>{{ hero.name | uppercase() }} Details</h2>
      <div><span>id: </span>{{ hero.id }}</div>
      <div>
        <label>name:
          <input v-model="hero.name" placeholder="name">
        </label>
      </div>
    </div>
    <button @click="goBack()">go back</button>
    <button @click="save()">save</button>
    <vtoh-message :messageService="service.message"/>
  </div>
</template>

<script>
import VtohMessage from '@/views/VtohMessage.vue'

import MessageService from '@/other/message-service.js'
import HeroService from '@/other/hero-service.js'

import uppercase from '@/filters'

export default {
  components: {
    VtohMessage
  },

  data () {
    return {
      hero: Object,
      service: {
        message: Object,
        hero: Object
      }
    }
  },

  methods: {
    // 前の画面に戻る
    goBack () {
      this.$router.back()
    },

    // ヒーローのデータを更新して前の画面に戻る
    async save () {
      await this.service.hero.updateHero(this.hero).then(() => {
        this.goBack()
      })
    }
  },

  // 親コンポーネントから受け取ったpramsを元にヒーローリストからヒーローを取得
  async created () {
    this.service.message = new MessageService()
    this.service.hero = new HeroService(this.service.message)
    const id = this.$route.params.id

    await this.service.hero.getHero(id).then(hero => {
      this.hero = hero.data
    })
  },

  // パイプ。angularのような組み込みはなし。自分で定義する必要があるらしい
  filters: {
    uppercase
  }
}
</script>
