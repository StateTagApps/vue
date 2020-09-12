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

    src: {
      type: String,
      default: null
    },
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
          return 'loading...';
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

    setContentFromSrc: function (src) {

      if(src.indexOf('http') !== 0){
        src = stateTagApp.server
            .concat(src)
      }

      var data = this.$data;
      var property = this.property

      this.server(src, 'setContentFromSrc')
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
    this.setContentFromSrc(this.src);
  }
}
</script>