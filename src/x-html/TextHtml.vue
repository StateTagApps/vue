<template>

  <!--{{ tagSpecs }}-->
  <component :is="tagName(tagSpec(tagSpecs, 0))"
             :class="tagClasses(tagSpec(tagSpecs, 0))"
             v-if="isHtml"
             v-show="!_.isEmpty(serviceContent)"
             v-html=serviceContent>
  </component>

  <component :is="tagName(tagSpec(tagSpecs, 1))"
             :class="tagClasses(tagSpec(tagSpecs, 1))"
             v-else
             v-show="!_.isEmpty(serviceContent) || _.isNumber(serviceContent)"
  >{{ serviceContent }}
  </component>

</template>

<script>
import _Services from "./_Services";

export default {
  extends: _Services,

  props: {
    tagSpecs: {
      type: String,
      default: "div,span"
    },

    isHtml: {
      type: Boolean,
      default: false
    },
  },

}
</script>