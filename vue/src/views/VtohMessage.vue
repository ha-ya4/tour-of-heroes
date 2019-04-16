<template>
  <div id="vtoh-message">
    <div v-if="messageService.messages.length">
    <h2>Messages</h2>
    <button
      class="clear"
      @click="messageService.clear()"> clear </button>
      <div v-for="message in messageService.messages" :key="message.id">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'messageService'
  ]
}
</script>
