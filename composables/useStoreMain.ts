import { defineStore } from 'pinia';
// import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const api = useStoreApi();

  const user = ref({});

  async function getUser() {
    const path = '/users/';
    const options = {
      method: 'get',
      // baseURL: 'https://mfvcni0p.directus.app',
      params: {
        limit: 1,
      },
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
