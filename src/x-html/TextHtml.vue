<template>

  <!--{{ tagSpecs }}-->
  <component :is="tagName(tagSpec(tagSpecs, 0))"
             :class="tagClasses(tagSpec(tagSpecs, 0))"
             v-if="isHtml"
             v-show="!_.isEmpty(content)"
             v-html=content>
  </component>

  <component :is="tagName(tagSpec(tagSpecs, 1))"
             :class="tagClasses(tagSpec(tagSpecs, 1))"
             v-else
             v-show="!_.isEmpty(content) || _.isNumber(content)"
  >{{ content }}
  </component>

</template>

<script>

export default {

  props: {

    tagSpecs: {
      type: String,
      default: "div,span"
    },

    locus: {
      type: String,
      default: null
    },

    isHtml: {
      type: Boolean,
      default: false
    },

    service: {
      type: String,
      default: ['api', 'socket', 'state'][0]
    },

    src: {
      required: true,
      type: String
    },

    connectingMsg: {
      type: String,
      default: 'connecting...'
    },
    waitingMsg: {
      type: String,
      default: 'waiting...'
    }
  },

  data: function () {
    return {
      privateContent: null,
      privateLoading: true,
    }
  },

  computed: {

    content: function () {
      switch (true) {
        case (this.service == 'state'):
          return this.$read(this.locus);
          break;

        case (this.privateLoading):
          return {
            api: 'loading...',
            socket: (this.$socket.disconnected) ? this.connectingMsg : this.waitingMsg
          }[this.service];
          break;

        case (!_.isNull(this.privateContent)):
          return this.privateContent;
          break;

        default:
          return 'error';
          break;
      }
    }
  },

  methods: {

    listenForContentFromSocket: function (event) {
      this.$onSocket(event, payload => {
        if (_.isEmpty(this.locus)) {
          this.privateContent = payload;
        } else {
          this.privateContent = _.get(payload, this.locus);
        }
        this.privateLoading = false;
      });
    },

    setContentFromSrc: function (src) {

      if (src.indexOf('http') !== 0) {
        src = stateTagApp.api
            .concat(src);
      }

      var data = this.$data;
      var locus = this.locus

      this.$api(src, 'setContentFromSrc')
          .then(function (response) {
            if (_.isEmpty(locus)) {
              data.privateContent = response.data;
            } else {
              data.privateContent = _.get(response.data, locus);
            }
            data.privateLoading = false;
          }.bind(data)
              .bind(locus));
    }
  },

  mounted: function () {
    switch (this.service) {
      case 'api':
        this.setContentFromSrc(this.src);
        break;

      case 'socket':
        this.listenForContentFromSocket(this.src);
        break;

      case 'state':
        this.privateLoading = false;
        break;
    }
  }
}
</script>