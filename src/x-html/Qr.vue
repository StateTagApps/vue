<template>
  <qrcode-vue
      :value="value"
      :size="size"

      :render-as="renderAs"
      :level="level"

      :margin="margin"
      :foreground="foreground"
      :background="background"
  />
</template>
<script>
import _Services from './_Services'
import QrcodeVue from 'qrcode.vue'

export default {
  extends: _Services,

  components: {
    QrcodeVue,
  },

  props: {
    template: {
      type: String,
      default: null
    },

    size: {
      // pixels
      type: Number,
      default: 100,
    },

    renderAs: {
      type: String,
      default: ['svg', 'canvas'][0]
    },

    margin: {
      //Define how much wide the quiet zone should be.
      type: Number,
      default: 0
    },

    level: {
      // https://en.wikipedia.org/wiki/QR_code#Error_correction
      type: String,
      default: ['L' | 'M' | 'Q' | 'H'][3]
    },

    foreground: {
      //The foreground color of qrcode.
      type: String,
      default: '#000000'
    },

    background: {
      //The background color of qrcode.
      type: String,
      default: '#ffffff'
    },
  },

  computed: {
    value: function (){
      if(!_.isNull(this.template)){

        var valueWorker = 'valueWorker = `'
        .concat(this.template.replace('{', '${'))
        .concat('`');

        eval(valueWorker);
        return valueWorker;
      }

      return this.serviceContent;
    }
  }
}
</script>