<template>
  <div v-if="withButton">
    <span>{{ locus }}: </span>
    <input type="text" v-model="txt">
    <button @click.prevent="submit">submit</button>
  </div>

  <input v-else
         type="text"
         v-model="txt"
         ref="input"
         @change.prevent="$write(locus, $refs['input'].value)"
  >
</template>

<script>
export default {

  props: {
    locus: {
      type: String,
      required: true
    },

    service: {
      type: String,
      default: ['state', 'nebula'][0]
    },

    withButton: {
      type: Boolean,
      default: true
    }
  },

  data: function () {
    return {txt: ''};
  },
  methods: {
    submit: function () {
      switch (this.service) {

        case 'state':
          this.$write(this.locus, this.txt);
          this.txt = '';
          break;

        case 'nebula':
          this.$nebula(this.locus, this.txt);
          this.txt = '';
          break;
      }
    }
  },

  mounted: function (){
    this.$onNebula(this.locus, function (val){
      console.log(val);
    })
  }
}
</script>