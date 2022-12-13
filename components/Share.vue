<script setup>
const state = reactive({
  description: '',
});
</script>

<template>
  <div class="flex flex-col items-start">
    <input v-model="state.description" class="w-full max-w-400px" type="text" />
    <button>отправить</button>
  </div>
</template>
