<script setup>
const state = reactive({
  description: '',
});
const soreMain = useSroreMain();
function addPost() {
  storeMain.postPost(state);
  state.description = '';
}
</script>

<template>
  <div class="flex flex-col items-start">
    <input v-model="state.description" class="w-full max-w-400px" type="text" />
    <button @click="addPost()">отправить</button>
  </div>
</template>
