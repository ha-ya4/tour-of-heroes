const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
// bodyのjsonデータを扱えるようにする
app.use(cors())
app.use(bodyParser.urlencoded({
  extend: true
}))
app.use(bodyParser.json())

class Hero {
  constructor (id, name) {
    this.id = id
    this.name = name
  }
}

class Heroes {
  constructor () {
    this.heroes = [
      new Hero(11, 'Mr.Nice'),
      new Hero(12, 'Narco'),
      new Hero(13, 'Bombasto'),
      new Hero(14, 'Celerritas'),
      new Hero(15, 'Magneta'),
      new Hero(16, 'Rubber'),
      new Hero(17, 'Dynama'),
      new Hero(18, 'Dr IQ'),
      new Hero(19, 'Magma'),
      new Hero(20, 'Tornado')
    ]
  }

  // ヒーローのリストを取得
  getHeroes () {
    return this.heroes
  }

  // 新しいヒーローをリストに追加
  addHero (hero) {
    this.heroes.push(hero)
  }

  // ヒーローの検索
  serchHeroes (term) {
    return this.heroes.filter(hero =>
      hero.name.indexOf(term) !== -1
    )
  }

  // 新しいヒーローの作成
  newHero (heroes, newHeroName) {
    let newId

    // 配列の中身があるかチェック。なければ１０、あれば最後のIDを+1してnewIdにする
    if (heroes.length === 0) {
      newId = 10
    } else {
      // リストの最後のindexを取得
      const index = heroes.length - 1
      // 最新のIDを作るためにリストの最後のヒーローのIDを取得して+1
      newId = heroes[index].id + 1
    }

    // 新しいヒーロー作成
    return new Hero(newId, newHeroName)
  }
}

const HEROES = new Heroes()

// ヒーローのリストを取得してレスポンスとして返す
app.get('/heroes', (req, res) => {
  const response = HEROES.getHeroes()

  res.json(response)
})

// idと一致するヒーローを取得してレスポンスとして返す
app.get('/hero/:id', (req, res) => {
  const id = Number(req.params.id)
  const response = HEROES.getHeroes().find(hero => hero.id === id)
  res.json(response)
})

// queryのnameを受け取ってそれを元にヒーローリストから検索
app.get('/term', (req, res) => {
  const term = req.query
  const heroes = HEROES.serchHeroes(term.name)

  res.json(heroes)
})

// idが一致するヒーローのデータを更新する
app.put('/update', (req, res) => {
  const reqData = req.body
  const hero = HEROES.getHeroes().find(hero => hero.id === reqData.id)
  hero.name = reqData.name
  res.send('ok')
})

// 新しいヒーローを追加
app.post('/add', (req, res) => {
  const reqData = req.body
  const heroes = HEROES.getHeroes()
  const newHero = HEROES.newHero(heroes, reqData.name)

  // 新しいヒーローを追加
  HEROES.addHero(newHero)

  // 追加されたヒーローのデータをレスポンスとして返す
  res.json(newHero)
})

// 指定されたIDのヒーローデータを削除
app.delete('/delete/:id', (req, res) => {
  const id = Number(req.params.id)
  const heroes = HEROES.getHeroes()

  // IDが一致するヒーローの削除
  for (let i = 0; i < heroes.length; i++) {
    if (heroes[i].id === id) {
      // splice->削除したいインデックスを指定。第二引数でそこから何個削除するかを指定できる
      heroes.splice(i, 1)
      break
    }
  }

  res.send('ok')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
