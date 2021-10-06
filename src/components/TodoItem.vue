<template>
  <div class="todo-item" v-bind:class="{ 'todo-item-done': todo.isDone }">
    <div class="todo-item-left">
      <button
        class="todo-marker"
        v-bind:class="{ 'todo-marker-done': todo.isDone }"
        @click="todo.isDone = !todo.isDone"
      >
        <div></div>
      </button>
      <p>{{ todo.name }}</p>
    </div>
    <div class="todo-item-rigth">
      <button
        v-if="todo.isDone"
        v-on:click="$emit('remove-todo', todo.id)"
      >
        delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  align-items: center;
  border-radius: 7px;
  border: 0.5px solid #b1b1b1;
  gap: 20px;
  background: #f5f5f5;
  transition: all .2s all;
}
.todo-item-done {
  opacity: 0.8;
}
.todo-item-done p {
  text-decoration: line-through;
}
.todo-item-left {
    width: 75%;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
}
.todo-item-rigth {
    width: 25%;
    text-align: end;
}
.todo-item input {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
.todo-item p {
  font-size: 20px;
}
/* custom checkbox style for non-completed todo */
.todo-marker {
  width: 23px;
  height: 23px;
  background: transparent;
  border: 3px solid #777;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s all;
}
.todo-marker div {
  width: 7px;
  height: 10px;
  border-bottom: 1px solid #777;
  border-right: 1px solid #777;
  transform: rotate(45deg);
  position: relative;
  top: -1px;
  left: 0.5px;
  transition: 0.2s all;
}
/* custom checkbox style for completed todo */
.todo-marker-done {
  border-color: #4caf50;
}
.todo-marker-done div {
  border-color: #138913;
}
</style>