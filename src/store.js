import { reactive, watch } from 'vue'

const saved = localStorage.getItem('tasks')

export const store = reactive({
  tasks: saved ? JSON.parse(saved) : []
})

watch(
  () => store.tasks,
  (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks)),
  { deep: true }
)

export function addTask(name) {
  store.tasks.push({ id: Date.now(), name, completed: false })
}

export function toggleTask(id) {
  const task = store.tasks.find((t) => t.id === id)
  if (task) task.completed = !task.completed
}

export function deleteTask(id) {
  store.tasks = store.tasks.filter((t) => t.id !== id)
}
