<template>
    <a-col :sm="24" :md="md">
        <a-form-item :label="label" style="display: flex">
          <!-- <a-select placeholder="请选择">
            <a-select-option value="1"> 1 </a-select-option>
            <a-select-option value="2"> Web服务 </a-select-option>
          </a-select> -->
          <slot></slot>
        </a-form-item>
    </a-col>
</template>

<script>
export default {
    props:{
        md:Number,
        label:String
    }
}
</script>

<style>

</style>