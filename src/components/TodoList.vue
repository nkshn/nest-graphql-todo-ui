<template>
  <div>
    <template v-if="todos.length >= counterOfTodosForUi">
      <div class="toggle-div" v-on:click="isShowList = !isShowList">
        <Title name="List of tasks" v-bind:count="todos.length" />
        <div
          class="toggle"
          v-bind:class="{ 'toggle-active': isShowList }"
        ></div>
      </div>
    </template>
    <template v-else>
      <div class="toggle-div">
        <Title name="List of tasks" v-bind:count="todos.length" />
      </div>
    </template>
    <h1 v-if="$apollo.queries.todos.loading">loading...</h1>
    <template v-if="todos.length > 0">
      <div v-if="isShowList" class="todo-list">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          v-bind:todo="todo"
          v-on:remove-todo="removeTodo"
        />
      </div>
    </template>
    <template v-else>
      <div class="no-todos">
        <h3>No todos</h3>
        <h5>Add one!</h5>
      </div>
    </template>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Title from "./Title.vue";
import TodoItem from "./TodoItem.vue";

// constants
import { COUNT_OF_TODOS_WHEN_UI_IS_CHANGING } from "../constants";

// helper functions
import {
  saveLocalStorage,
  getLocalStorage
} from "../helpers";

export default {
  name: "TodoList",
  data: function () {
    return {
      isShowList: true,
      todos: [],
      counterOfTodosForUi: COUNT_OF_TODOS_WHEN_UI_IS_CHANGING
    };
  },
  mounted() {
    this.isShowList = getLocalStorage().isShowList;
  },
  watch: {
    isShowList: {
      handler(newValue) {
        const object = getLocalStorage() || {}; // getting from local storage
        object.isShowList = newValue; // update one property of getted object

        saveLocalStorage(object); // save updated object to local storage
      },
    },
  },
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
  methods: {
    removeTodo: function (todoId) {
      this.$emit("remove-todo", todoId);
    }
  },
  components: {
    Title,
    TodoItem,
  },
};
</script>

<style scoped>
.toggle-div {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: baseline;
  cursor: pointer;
}
.toggle {
  width: 15px;
  height: 15px;
  border-bottom: 3px solid white;
  border-right: 3px solid white;
  transform: rotate(45deg);
  transition: 0.1s all;
  cursor: pointer;
}
.toggle-active {
  transform: rotate(225deg);
}
.todo-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.no-todos {
  text-align: center;
  width: 185px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.no-todos h3 {
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  font-size: 24px;
}
.no-todos h5 {
  color: white;
  font-size: 18px;
}
</style>