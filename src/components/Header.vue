<template>
  <h1>{{ name }}</h1>
</template>

<script>
export default {
  name: "Header",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 36px;
  color: #7ba7fc;
}
</style>