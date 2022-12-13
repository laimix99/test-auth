<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
const api = useStoreApi();
const storeMain = useStoreMain();
const accessToken = ref(null);
const accessTokenExpires = ref(null);
const refreshToken = ref(null);
const state = reactive({
  email: 'maksim.tchava@yandex.ru',
  password: 'Il3zuVyiHKzOCHegxOtEvyH0',
  loginLoading: false,
  user: null,
});
async function login() {
  try {
    console.log(':login');
    const { data } = await api.ftch('/auth/login', {
      method: 'post',
      body: {
        // mode: 'cookie',
        email: state.email,
        password: state.password,
      },
      credentials: 'include',
    });
    console.log(':login data', data);
    api.saveTokens(data);
  } catch (e: any) {
    console.log(':login error', e);
    api.removeTokens();
  }
}
async function logout() {
  try {
    console.log(':logout start');
    const { data } = await api.ftch('/auth/logout', {
      method: 'post',
      body: {
        // mode: 'cookie',
        refresh_token: api.refreshToken,
      },
      // credentials: 'include',
    });
    console.log(':logout data', data);
    api.removeTokens();
  } catch (e: any) {
    console.log(':logout error', e);
    api.removeTokens();
  }
}
const { pause, resume, isActive } = useIntervalFn(
  () => {
    storeMain.getUser();
  },
  3000,
  { immediate: true }
);
pause();
watch(
  () => api.accessToken,
  (to) => {
    if (to) {
      console.log(':W api.accessToken', to);
      resume();
    } else {
      console.log(':W api.accessToken', to);
      pause();
    }
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  console.log(':onMounted');
});
</script>

<template>
  <div
    class="
      flex flex-col
      w-full
      p-4
      gap-y-2
      items-start
      content-start
      justify-start
      box-border
    "
  >
    <h1 class="font-bold text-black text-2xl">Directus Auth</h1>
    <div>
      <pre class="text-black">{{ storeMain.user }}</pre>
    </div>
    <div class="flex flex-col bg-hex-333 p-2 w-233px gap-y-2">
      <input
        v-model="state.email"
        type="text"
        placeholder="Email"
        class="text-black"
      />
      <input
        v-model="state.password"
        type="text"
        placeholder="Password"
        class="text-black"
        @keyup.enter="login()"
      />
      <button @click="login()">Login</button>
    </div>

    <span class="font-semibold text-white">Tokens</span>
    <small class="text-black access"
      >access: {{ api.accessToken || '-' }}</small
    >
    <small class="text-black">refresh: {{ api.refreshToken || '-' }}</small>

    <div class="flex flex-row gap-x-2">
      <button @click="api.breakTokens(true, false)">Breake Access Token</button>
      <button @click="api.breakTokens(false, true)">
        Breake Refresh Token
      </button>
      <button @click="api.breakTokens(true, true)">Breake All Tokens</button>
    </div>

    <div class="flex flex-row gap-x-2">
      <button @click="api.refreshTokens()">Refresh</button>
      <button @click="logout()">Logout</button>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply bg-hex-444 w-auto min-w-140px px-4;
}
pre {
  font-size: 11px;
}
.access {
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  white-space: nowrap;
}
</style>
