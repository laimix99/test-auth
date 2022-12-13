<script setup>
const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});
const storeMain = useStoreMain();
console.log('юзер', storeMain.state.user);
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-row items-center gap-2">
      <h1 class="text-black">{{ storeMain.state.user.first_name }}</h1>
      <h1>{{ storeMain.state.user.last_name }}</h1>
      <h1>{{ new Date(post.date_created).toLocaleDateString('en-US') }}</h1>
    </div>
    <span>{{ post.description }}</span>
    <button class="w-80px">удалить</button>
  </div>
</template>

<style scoped>
h1 {
  font-size: 16px;
}
</style>
