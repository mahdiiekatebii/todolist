<template>
  <div
      class="flex overflow-y-auto overflow-x-hidden fixed bg-[#434343b3] top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      :class="[model.status == true ? 'flex' : 'hidden']"
  >
    <div class="relative p-4 md:max-w-1/4 w-full max-h-full">
      <div class="relative  rounded-3xl shadow-sm "
           :class="[theme.theme =='dark' ? 'bg-[#252525] text-white border-1 border-white' : 'bg-white text-gray-900']"
      >
        <div
            class="flex items-center justify-center p-4 md:p-5 rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-2xl font-bold ">
            EDIT NOTE
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label
                  for="name"
                  class="block mb-2 text-sm font-medium "
              >edit Task</label
              >
              <input
                  @input="handleTaskInput"
                  :value="task"
                  type="text"
                  class=" border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="input your note..."
              />
            </div>

            <div class="col-span-2">
              <label
                  for="name"
                  class="block mb-2 text-sm font-medium "
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
              <!-- Dropdown menu -->

              <div
                  id="dropdown"
                  class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 w-full"
                  :class="[dropDownCategory == true ? 'flex' : 'hidden']"
              >
                <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200 w-full"
                >
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
          <div class="flex justify-between mt-10">
            <button
                @click="closeModal"
                class="cursor-pointer inline-flex items-center border-1 border-[#6C63FF] text-[#6C63FF] rounded-lg text-md font-bold px-5 py-2.5 text-center "
            >
              CANCEL
            </button>
            <button
                @click="handleEditTodo"
                class="cursor-pointer text-white inline-flex items-center bg-[#6C63FF] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md font-bold px-5 py-2.5 text-center "
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useTodolist} from "../stores/todo";
import {useTheme} from "../stores/theme";
import {ref, watch} from "vue";

let dropDownCategory = ref(false);
const todo = useTodolist();
let task = ref("");
let model = defineModel({status:'',update:""});
let theme=useTheme()
let labelCategory = ref("work");
const props = defineProps(["id"]);

watch(
    () => [props.id],
    () => {
      const data = window.localStorage.getItem("todoList");
      const parsData = JSON.parse(data);
      const findTodo = parsData.find((item) => item.id === props.id);
      task.value = findTodo.task;
      labelCategory.value = findTodo.category;

    },
    {}
);

const categoryData = ref([
  { id: 1, name: "work" },
  { id: 2, name: "personal" },
  { id: 3, name: "Projects" },
]);
function dropDown() {
  dropDownCategory.value = !dropDownCategory.value;
}

function closeModal() {
  model.value.status = !model.value.status;
}

function handleTaskInput(e) {
  task.value = e.target.value;
}

function selectedCategory(category) {
  labelCategory.value = category.name;
  dropDownCategory.value=false
}

function handleEditTodo() {
  closeModal()
  todo.editTodo(props.id,task.value, labelCategory.value);
  const data = window.localStorage.getItem("todoList");
  model.value.update=JSON.parse(data)
}
</script>
<style scoped></style>
