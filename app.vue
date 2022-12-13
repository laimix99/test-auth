<script setup>
const storeMain = useStoreMain();
onMounted(() => {
  storeMain.getPost();
});
</script>

<template>
  <div class="flex flex-col">
    <Auth />
    <Share />
    <div class="flex flex-col">
      <Post v-for="post in storeMain.state.posts" :post="post" />
    </div>
  </div>
</template>
