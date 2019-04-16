export default class MessageService {
  messages = []

  add (mess) {
    // IDは必要ないけどv-forのkeyに使う用で一応
    const message = {
      id: this.messages.length,
      message: mess
    }
    this.messages.push(message)
  }

  clear () {
    this.messages = []
  }
}
