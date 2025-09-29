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
            Delete NOTE
          </h3>
        </div>
        <div class="p-4 md:p-5">
          <div class="flex justify-center ">

            <button
                @click="handleDeleteTodo"
                class="cursor-pointer text-white inline-flex items-center bg-[#6C63FF] hover:bg-[#534CC2] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md font-bold px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <div class="relative size-8 mr-2">
                <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <!-- Background Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current  text-[#6C63FF]"
                          stroke-width="2"></circle>
                  <!-- Progress Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current  text-gray-200 dark:text-blue-500"
                          stroke-width="2" stroke-dasharray="100" :stroke-dashoffset="dashoffset"
                          stroke-linecap="round"></circle>
                </svg>

                <!-- Percentage Text -->
                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span class="text-center text-sm font-bold text-white dark:text-blue-500">{{ startTime }}</span>
                </div>
              </div>
              UNDO
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"/>
              </svg>


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

let timer = ref("")
let startTime = ref(3)
let dashoffset = ref(0)
const todo = useTodolist();
let model = defineModel({status: '', update: ""});
const props = defineProps(["id"]);
let theme = useTheme();

watch(
    () => [props.id],
    () => {
      startTime.value = 3
      dashoffset.value = 0
      counterDown()
    },
    {}
);

function closeModal() {
  model.value.status = !model.value.status;
}
function counterDown() {
  timer = setInterval(() => {
    startTime.value -= 1
    dashoffset.value = dashoffset.value + 33.33333333333333
    if (startTime.value === 0) {
      todo.deleteTodo(props.id);
      const data = window.localStorage.getItem("todoList");
      model.value.update = JSON.parse(data)
      closeModal()
      clearInterval(timer);
    }
  }, 1000)

}
function handleDeleteTodo() {
  if (startTime.value > 0) {
    closeModal()
    startTime.value = 3
    dashoffset.value = 0
    clearInterval(timer);
  }

}
</script>
<style scoped></style>
