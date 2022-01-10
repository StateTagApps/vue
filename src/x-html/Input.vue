<template>
  <div >
    <span>{{ locus }}: </span>
    <input type="text" v-model="serviceContent">
  </div>
</template>

<script>
import _Services from "./_Services";

export default {
  extends: _Services,
}
</script>