<template>
  <a-col :sm="24" :md="md">
    <a-form-item :label="label" style="display: flex">
      <slot></slot>
    </a-form-item>
  </a-col>
</template>

<script>
export default {
  props: {
    md: Number,
    label: String
  }
}
</script>

<style>
</style>