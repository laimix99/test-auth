<script setup>
const state = reactive({
  text: '',
});
</script>

<template>
  <div class="flex flex-col items-start">
    <input v-model="state.text" class="w-full max-w-400px" type="text" />
    <button>отправить</button>
  </div>
</template>
