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
      this.$write(this.locus, this.txt);
      this.txt = '';
    }
  },

  computed: {
    anything: function () {
      return this.$read(this.locus);
    },
  },

  watch: {
    anything: function (fresh, stale) {
      let log = 'Local watcher heard '
          .concat(this.locus)
          .concat(' changed from ')
          .concat(stale)
          .concat(' to ')
          .concat(fresh);

      this.log(log);
    }
  }
}
</script>