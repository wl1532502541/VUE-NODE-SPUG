<template>
  <a-form
    layout="horizontal"
    :label-col="{ flex: '75px' }"
    :wrapper-col="{ flex: 'auto' }"
  >
    <a-row :gutter="12">
      <slot></slot>
    </a-row>
  </a-form>
</template>

<script>
import Vue from "vue"
import SearchFormItem from "./SearchFormItem.vue"
Vue.use(SearchFormItem)
export default {
};
</script>

<style></style>
