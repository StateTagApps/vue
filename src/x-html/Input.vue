<template>
  <div>
    <span>{{ locus }}: </span>
    <input type="text" v-model="txt">
    <button @click="submit">submit</button>
  </div>
</template>

<script>
export default {

  props: {
    locus: {
      type: String,
      required: true
    }
  },

  data: function () {
    return {txt: ''}
  },
  methods: {
    submit: function () {
      this.$write(this.locus, this.txt);
    }
  },
  mounted: function (){
    this.txt = this.$read(this.locus);
  }
}
</script>