<template>
  <div class="header">
    <form class="header-form" v-on:submit.prevent="onFormSubmit">
      <input
        type="text"
        maxlength="60"
        v-model="taskName"
        placeholder="Enter a task name..."
        ref="input"
      />
      <button
        type="submit"
        v-bind:class="{ 'btn-disabled': !taskName }"
        :disabled="!taskName"
        v-if="isLoading"
      >
        loading
      </button><button
        type="submit"
        v-bind:class="{ 'btn-disabled': !taskName }"
        :disabled="!taskName"
        v-else
      >
        add task
      </button>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";

// helper functions
import {
  saveLocalStorage,
  getLocalStorage
} from "../helpers";

export default {
  name: "AddTodo",
  data: function () {
    return {
      taskName: "",
      isLoading: false,
    };
  },
  mounted() {
    this.taskName = getLocalStorage().taskName;
    this.$refs.input.focus();
  },
  watch: {
    taskName: {
      handler(newValue) {
        const object = getLocalStorage() || {}; // getting from local storage
        object.taskName = newValue; // update one property of getted object
        
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
      skip() {
        return true;
      },
      update(data) {
        return data.findAllTodos;
      },
    },
  },
  methods: {
    onFormSubmit: async function () {
      if (this.taskName.trim().length > 0) {
        console.log("name:", this.taskName);

        try {
          this.isLoading = true;

          await this.$apollo.mutate({
            mutation: gql`
              mutation ($name: String!) {
                create(todo: { name: $name }) {
                  id
                  name
                }
              }
            `,
            variables: {
              name: this.taskName,
            },
          });

          this.$apollo.queries.todos.skip = false;
          this.$apollo.queries.todos.refetch();

          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
        }
        this.taskName = "";
        this.$refs.input.focus();
      }
    },
  },
};
</script>

<style scoped>
div.header {
  margin-bottom: 30px;
  text-align: left;
}
.header-form {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  gap: 25px;
}
input {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 7px;
  padding-left: 7px;
  position: relative;
  color: white;
  background: transparent;
  outline-color: #2196f3;
  border: 2px solid white;
  border-radius: 5px;
  width: 75%;
}
input::placeholder {
  color: white;
}
button {
  font-weight: 600;
  text-transform: capitalize;
  border: 2px solid white;
  font-size: 20px;
  background: transparent;
  padding: 15px;
  border-radius: 5px;
  color: white;
  width: 25%;
  transition: all 0.2s;
  cursor: pointer;
}
button:hover {
  color: #2196f3;
  background: white;
}

.btn-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.btn-disabled:hover {
  cursor: not-allowed;
  opacity: 0.5;
  background: transparent;
  color: white;
}
</style>