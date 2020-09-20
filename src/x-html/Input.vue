<template>
  <div>
    <input type="text" v-model="txt">
    <button @click="save">submit</button>
  </div>
</template>

<script>
export default {

  data: function () {
    return {txt: ''}
  },
  methods: {
    save: function () {
      this.$write('msg.en', this.txt);
      this.txt = '';
    }
  }
}
</script>