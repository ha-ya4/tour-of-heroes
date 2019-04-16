import axios from 'axios'

export default class HeroService {
  constructor (messageService) {
    this.messageService = messageService
    this.baseUrl = 'http://localhost:3000/'
  }

  // getリクエスト。ヒーローリスト取得
  async getHeroes () {
    const url = this.baseUrl + 'heroes'

    return axios.get(url).then(res => {
      this.log('fetchd heroes')
      return res
    }).catch(error => {
      return this.handleError('getHeroes', error, [])
    })
  }

  // getリクエスト。指定したヒーローのデータを取得
  async getHero (id) {
    const url = `${this.baseUrl}hero/${id}`

    return axios.get(url).then(res => {
      this.log(`fetchd hero id=${id}`)
      return res
    }).catch(error => {
      return this.handleError(`getHero id=${id}`, error, { id: undefined, name: undefined })
    })
  }

  // putリクエスト。指定したヒーローのデータを更新
  async updateHero (hero) {
    const url = this.baseUrl + 'update'

    return axios.put(url, hero).then(res => {
      this.log(`update hero id=${hero.id}`)
    }).catch(error => {
      this.handleError('updateHero', error, [])
    })
  }

  // postリクエスト。あたらしいヒーローを追加
  async addHero (hero) {
    const newHero = { name: hero }
    const url = this.baseUrl + 'add'

    return axios.post(url, newHero).then(res => {
      this.log(`added hero w/ id=${res.data.id}`)
      return res
    }).catch(error => {
      this.handleError('updateHero', error, [])
    })
  }

  // デリートリクエスト。サーバー側のリストから選択されたヒーローを削除
  async deleteHero (hero) {
    const id = hero.id
    const url = `${this.baseUrl}delete/${id}`

    return axios.delete(url).then(res => {
      this.log(`delete hero  id=${id}`)
    }).catch(error => {
      this.handleError('deleteHero', error, [])
    })
  }

  // getリクエスト。検索語を含むヒーローを取得。
  async serchHeroes (term) {
    // 空白ならリターン
    if (!term.trim()) {
      return []
    }

    const url = `${this.baseUrl}term?name=${term}`

    return axios.get(url).then(res => {
      this.log(`found heroes matchng "${term}"`)
      return res
    }).catch(error => {
      return this.handleError('serchHeroes', error, [])
    })
  }

  log (message) {
    this.messageService.add(`HeroService: ${message}`)
  }

  handleError (operation, error, result) {
    console.error(error)

    this.log(`${operation} failed: ${error.message}`)

    return result
  }
}
