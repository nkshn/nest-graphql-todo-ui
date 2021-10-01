<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
      {{ todo.isDone }} + {{ todo.name }}
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "HelloWorld",
  apollo: {
    todos: {
      query: gql`
        {
          findAllTodos {
            id
            name
            isDone
            createdAt
            updatedAt
          }
        }
      `,
      update(data) {
        return data.findAllTodos;
      },
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
