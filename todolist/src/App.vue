<template>
  <div class="w-auto m-auto pt-24 relative h-screen">
    <h1 class="text-center text-4xl font-bold mb-8">Todo List</h1>

    <div class="flex gap-8 justify-center items-center w-full">
      <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
      >
      <div class="relative w-[595px]">
        <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
          >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
            type="search"
            :value="searchInput"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
            @input="handleSearch"
        />
        <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-[#6C63FF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      <!-- drop down-->
      <div>
        <button
            @click="handleDropDown"
            class="text-white bg-[#6C63FF] cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
        >
          {{ labelCategory }}
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
            class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm  dark:bg-gray-700"
            :class="[dropDown == true ? 'flex' : 'hidden']"
        >
          <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200 w-3xs absolute bg-white border-1 border-gray-100"
          >
            <li @click="selectedCategory('all')">
              <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >All</a
              >
            </li>
            <li v-for="c in categoryData" @click="selectedCategory(c)">
              <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >{{ c.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!--dark & light-->
      <button
          type="button"
          class="text-white bg-[#6C63FF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </button>
      <button
          type="button"
          class="text-white bg-[#6C63FF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      </button>
    </div>

    <!-- todos-->
    <div class="flex justify-center cursor-pointer flex-col items-center">
      <div
          class="flex justify-between items-center border-b-[#8b85f5e6] border-b-1 pb-3 w-[520px] mt-8"
          v-for="task in todoLists"
      >
        <div class="flex">
          <div class="flex items-center h-5">
            <input
                id="helper-checkbox"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                :value="task.id"
                v-model="task.completed"
                @input="handleChangeCheckBox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div class="ms-2 text-sm">
            <label
                class="font-medium"
                :class="[task.completed ? 'line-through text-gray-400' : '']"
            >{{ task.task }}</label
            >
          </div>
        </div>
        <div class="flex justify-center items-center gap-2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-gray-300 cursor-pointer"
              @click="openModalEdit(task.id)"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-gray-300 cursor-pointer"
              @click="openModalDelete(task.id)"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>

    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#8b85f5e6"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-15 cursor-pointer absolute text-white bottom-30 right-0"
        @click="openModalAdd"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    <div :class="[modal == true ? 'flex' : 'hidden']">
      <AddTodo v-model="modal"/>
    </div>
    <div :class="[editModal.status == true ? 'flex' : 'hidden']">
      <EditTodo v-model="editModal" :id="todoId"/>
    </div>
    <div :class="[deleteModal.status == true ? 'flex' : 'hidden']">
      <DeleteTodo v-model="deleteModal" :id="todoId"/>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
import AddTodo from "./components/AddTodo.vue";
import EditTodo from "./components/EditTodo.vue";
import DeleteTodo from "./components/DeleteTodo.vue";
import {useTodolist} from "./stores/todo";
import {ref, watch} from "vue";

const todo = useTodolist();
let labelCategory = ref("work");
let dropDown = ref(false);
let modal = ref(false);
let editModal = ref({
  status: false,
  update: ""
});

let deleteModal = ref({
  status: false,
  update: ""
});

let todoId = ref("");
let searchInput = ref("");
let todoLists = ref([]);

const categoryData = ref([
  {id: 1, name: "work"},
  {id: 2, name: "personal"},
  {id: 3, name: "Projects"},
]);

function handleDropDown() {
  dropDown.value = !dropDown.value;
}

function selectedCategory(category) {
  const data = window.localStorage.getItem("todoList");
  if (category === "all") {
    labelCategory.value = "all";
    todoLists.value = JSON.parse(data);
  } else {
    labelCategory.value = category.name;
    todoLists.value = JSON.parse(data).filter(
        (item) => item.category === labelCategory.value
    );
  }
}

function openModalAdd() {
  modal.value = true;
}

function openModalEdit(id) {
  todoId.value = id;
  editModal.value.status = true
}

function openModalDelete(id) {
  todoId.value = id;
  deleteModal.value.status = true
}

function showTodoList() {
  const data = window.localStorage.getItem("todoList");
  todoLists.value = JSON.parse(data);
}

showTodoList();

function handleChangeCheckBox(e) {
  const id = e.target.value;
  todo.completedTodo(id);
  const data = window.localStorage.getItem("todoList");
  todoLists.value = JSON.parse(data);
}

function handleSearch(e) {
  searchInput.value = e.target.value;
}


watch(
    () => [editModal.value.update,deleteModal.value.update],
    () => {
      const data = window.localStorage.getItem("todoList");
      todoLists.value = JSON.parse(data);
    },
    {}
);


function searchTodo() {
}
</script>

<style></style>
