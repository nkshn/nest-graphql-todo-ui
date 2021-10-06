<template>
  <h3 v-if="count > 0">{{ name }} ({{ count }})</h3>
  <h3 v-else>{{ name }}</h3>
</template>

<script>
export default {
  name: "Title",
  props: {
    name: {
      type: String,
      required: true,
      default: "ToDo List",
    },
    count: {
      type: Number,
    },
  },
};
</script>

<style scoped>
h3 {
  font-weight: bold;
  font-size: 28px;
  color: #ffffff;
  text-align: left;
}
</style>