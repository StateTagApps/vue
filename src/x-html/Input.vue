<template>
  <div v-if="withButton">
    <span>{{ locus }}: </span>
    <input type="text" v-model="txt">
    <button @click="submit">submit</button>
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

    withButton: {
      type: Boolean,
      default: true
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
  mounted: function () {
    this.txt = this.$read(this.locus);
  },

  computed: {
    anything: function () {
      return this.$read(this.locus);
    },
  },
  watch: {
    anything: function (fresh, stale) {
      let log = this.locus
          .concat(' changed from ')
          .concat(stale)
          .concat(' to ')
          .concat(fresh);

      this.devLog(log);
    }
  }
}
</script>