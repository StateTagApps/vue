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
import {mapState, mapActions, mapMutations, mapGetters} from "vuex";

export default {

  props: {

    tagSpecs: {
      type: String,
      default: "div,span"
    },

    property: {
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
        case (this.privateLoading):
          return {
            api: 'loading...',
            socket: 'connecting...',
            state: ''
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
    ...mapActions(['greet']),

    listenForContentFromSocket: function (src) {
      this.$socket.$subscribe(src, payload => {
        if (_.isEmpty(this.property)) {
          this.privateContent = payload;
        } else {
          this.privateContent = _.get(payload, this.property);
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
      var property = this.property

      this.$api(src, 'setContentFromSrc')
          .then(function (response) {
            if (_.isEmpty(property)) {
              data.privateContent = response.data;
            } else {
              data.privateContent = _.get(response.data, property);
            }
            data.privateLoading = false;
          }.bind(data)
              .bind(property));
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

    }

    var greet = this.greet;
    this.$nextTick(function () {
      greet('yo a playa');
    }.bind(greet));
  }
}
</script>