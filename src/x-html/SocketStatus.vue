<template>
  <span><slot></slot>{{ status }}</span>
</template>

<script>
export default {
  computed: {
    status: function (){
      return (this.$socket.connected)? 'connected' : 'NOT connected';
    }
  }
}
</script>