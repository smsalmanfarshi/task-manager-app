<script setup>
import { ref, computed } from 'vue'
import { store, addTask, toggleTask, deleteTask } from '../store'

const showForm = ref(false)
const showCompletedOnly = ref(false)
const newTask = ref('')
const error = ref('')

function isValidTaskName(name) {
  return name.trim().length >= 3
}

function handleAdd() {
  if (!isValidTaskName(newTask.value)) {
    error.value = 'Task name must be at least 3 characters'
    return
  }
  addTask(newTask.value.trim())
  newTask.value = ''
  error.value = ''
}

const visibleTasks = computed(() =>
  showCompletedOnly.value
    ? store.tasks.filter((t) => t.completed)
    : store.tasks
)
</script>

<template>
  <div class="container">
    <h1>Task Manager</h1>

    <div class="actions">
      <button @click="showForm = !showForm">
        {{ showForm ? 'Hide Form' : 'Add New Task' }}
      </button>
      <button @click="showCompletedOnly = !showCompletedOnly">
        {{ showCompletedOnly ? 'Show All' : 'Show Completed' }}
      </button>
    </div>

    <form v-if="showForm" class="form" @submit.prevent="handleAdd">
      <input v-model="newTask" type="text" placeholder="Enter task name" />
      <button type="submit">Add</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <p v-if="visibleTasks.length === 0" class="empty">No tasks available</p>

    <ul v-else class="list">
      <li
        v-for="task in visibleTasks"
        :key="task.id"
        :style="
          task.completed
            ? { backgroundColor: 'lightgreen', border: '2px solid red' }
            : {}
        "
      >
        <span>{{ task.name }}</span>
        <div>
          <button @click="toggleTask(task.id)">
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button class="delete" @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container { max-width: 600px; margin: 40px auto; padding: 0 16px; font-family: sans-serif; }
.actions { display: flex; gap: 8px; margin-bottom: 16px; }
.form { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.form input { flex: 1; padding: 8px; }
.error { width: 100%; color: red; margin: 0; }
.list { list-style: none; padding: 0; }
.list li {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px; margin-bottom: 8px; border: 2px solid #ccc; border-radius: 6px;
}
.list li div { display: flex; gap: 6px; }
.delete { background: #e74c3c; color: #fff; border: none; border-radius: 4px; }
button { padding: 6px 12px; cursor: pointer; }
.empty { text-align: center; color: gray; }
</style>
