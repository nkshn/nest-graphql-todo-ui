<template>
  <div id="app">
    <Header name="Vue ToDo" />
    <section>
      <Title name="Create new task" />
      <AddTodo />
      <TodoList v-on:remove-todo="removeTodo" />
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

import Header from "./components/Header.vue";
import Title from "./components/Title.vue";
import TodoList from "./components/TodoList.vue";
import AddTodo from "./components/AddTodo.vue";

export default {
  name: "App",
  methods: {
    async removeTodo(todoId) {
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($label: String!) {
            deleteTodoById(id: $label)
          }
        `,
        // Parameters
        variables: {
          label: todoId,
        },
      });
    }
  },
  components: {
    Header,
    Title,
    TodoList,
    AddTodo,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: normal;
}
body {
  overflow-y: scroll;
}
#app {
  text-align: center;
  color: #2c3e50;
  width: 65%;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 60px;
}
section {
  width: 100%;
  min-height: 760px;
  height: 100%;
  border-radius: 45px;
  background: #7ba7fc;
  margin-top: 32px;
  padding-top: 50px;
  padding-right: 75px;
  padding-left: 75px;
  padding-bottom: 50px;
}
</style>
