import { defineStore } from 'pinia';
// import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const api = useStoreApi();
  const state = reactive({
    user: {},
    posts: [],
  });

  async function getUser() {
    const path = '/users/me';
    const options = {
      method: 'get',
    };
    const { data } = await api.ftch(path, options);
    console.log(':getUsers', data);
    state.user = data;
  }

  async function getPost() {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      params: {
        limit: -1,
        sort: ['-date_created'],
      },
    });
    console.log('getPost', data);
    state.posts = data;
  }
  async function postPost(post: any) {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: post.description,
      },
    });
    getPost();
  }

  async function deletePost(id: string) {
    await api.ftch(`/items/posts${id}`, {
      method: 'delete',
    });
    getPost();
  }
  return {
    state,

    getUser,
    getPost,
    postPost,
    deletePost,
  };
});
