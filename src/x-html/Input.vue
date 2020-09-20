<template>
  <div>
    <input type="text" v-model="txt">
    <button @click="submit">submit</button>
  </div>
</template>

<script>
export default {

  data: function () {
    return {txt: ''}
  },
  methods: {
    submit: function () {
      this.$write('msg.en', this.txt);
      this.txt = '';
    }
  }
}
</script>