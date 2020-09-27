<template>
  <div>
    <span>{{ model }}: </span>
    <input type="text" v-model="txt">
    <button @click="submit">submit</button>
  </div>
</template>

<script>
export default {

  props: {
    model: {
      type: String,
      required: true
    }
  },

  data: function () {
    return {txt: ''}
  },
  methods: {
    submit: function () {
      this.$write(this.model, this.txt);
    }
  },
  mounted: function (){
    this.txt = this.$read(this.model);
  }
}
</script>