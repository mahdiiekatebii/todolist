<template>
  <div
      class="flex overflow-y-auto overflow-x-hidden fixed bg-[#434343b3] top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      :class="[model == true ? 'flex' : 'hidden']"
  >
    <div class="relative p-4 md:max-w-1/4 w-full max-h-full">
      <div class="relative bg-white rounded-3xl shadow-sm dark:bg-gray-700">
        <div
            class="flex items-center justify-center p-4 md:p-5 rounded-t dark:border-gray-600 border-gray-200"
        >
          <slot name="header"> </slot>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5">
          <slot name="body"> </slot>
          <div class="flex justify-between mt-10">
            <slot name="btn"></slot>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

let model = defineModel();

// function closeModal() {
//   model.value = !model.value;
// }
</script>
<style scoped></style>
