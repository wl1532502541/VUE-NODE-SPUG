<template>
  <!-- <a-form layout="horizontal" :label-col="{ flex: '75px' }" :wrapper-col="{ flex: 'auto' }"> -->
  <a-form class="searchForm">
    <a-row :gutter="{md: 8, lg: 24, xl: 48}">
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

<style>
.searchForm :global(.ant-form-item) {
  display: flex;
}

/* .searchForm :global(.ant-form-item-control-wrapper) {
  flex: 1;
} */
.searchForm .ant-form-item-control-wrapper {
  flex: 1;
}

/* .searchForm :global(.ant-form-item-label) {
  padding-right: 8px;
} */
.searchForm .ant-form-item-label {
  padding-right: 8px;
}
</style>
