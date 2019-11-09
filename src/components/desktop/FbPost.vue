<template lang="pug">
  .report-fb-post
    slot
</template>

<script>
export default {
  name: 'FbPost'
}
</script>

<style lang="stylus">
.report-fb-post
  margin 64px -80px
  & iframe
    display block
</style>
