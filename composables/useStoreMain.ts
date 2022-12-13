import { defineStore } from 'pinia';
// import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const api = useStoreApi();

  const user = ref({});

  async function getUser() {
    const path = '/users/me';
    const options = {
      method: 'get',
      // baseURL: 'https://mfvcni0p.directus.app',
    };
    const { data } = await api.ftch(path, options);
    console.log(':getUsers', data);
    user.value = data;
  }

  return {
    user,

    getUser,
  };
});
