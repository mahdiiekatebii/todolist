<template>
  <Modal v-model="model">
    <template v-slot:header>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">NEW NOTE</h3>
    </template>

    <template v-slot:body>
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >new Task</label
          >
          <input
              @input="handleTaskInput"
              :value="task"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="input your note..."
              autocomplete="none"
          />
        </div>

        <div class="col-span-2">
          <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >category</label
          >
          <button
              id="dropdownDefaultButton"
              @click="dropDown"
              class="text-white w-full bg-[#6C63FF] cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-between items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
          >
            <p>
              {{ labelCategory }}
            </p>
            <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
              <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
              id="dropdown"
              class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 w-full"
              :class="[dropDownCategory == true ? 'flex' : 'hidden']"
          >
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 w-full">
              <li v-for="c in categoryData" @click="selectedCategory(c)">
                <a
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                >{{ c.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:btn>
      <button
          @click="closeModal"
          type="submit"
          class="cursor-pointer inline-flex items-center border-1 border-[#6C63FF] text-[#6C63FF] rounded-lg text-md font-bold px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        CANCEL
      </button>
      <button
          @click="handleAddTodo(task)"
          type="submit"
          class="cursor-pointer text-white inline-flex items-center bg-[#6C63FF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md font-bold px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        APPLY
      </button>
    </template>
  </Modal>
</template>
<script setup>
import { useTodolist } from "../store/todo";
import Modal from "./Modal.vue";
import { ref } from "vue";

let dropDownCategory = ref(false);
const todo = useTodolist();
const task = ref("");
let model = defineModel();
let labelCategory = ref("work");

const categoryData = ref([
  { id: 1, name: "work" },
  { id: 2, name: "personal" },
  { id: 3, name: "Projects" },
]);
function dropDown() {
  dropDownCategory.value = !dropDownCategory.value;
}

// function closeModal() {
//   model.value = !model.value;
// }

function selectedCategory(category) {
  labelCategory.value = category.name;
}
function handleTaskInput(e) {
  task.value = e.target.value;
}

function handleAddTodo() {
  todo.addTodo(task.value, labelCategory.value);
}
</script>
<style scoped></style>
