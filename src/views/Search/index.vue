<template>
  <div>
    <TypeNav></TypeNav>
    <!-- Search
      params参数:{{this.$route.params.keyword}}----query参数:{{this.$route.query.keyword1}} -->
      <!-- params:{{keyword}} ==== query参数:{{keyword1}} -->
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword','keyword1']
}
</script>

<style lang="less" scoped>

</style>
