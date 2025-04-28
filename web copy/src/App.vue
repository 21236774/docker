<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-xl font-bold text-indigo-600"
                >博客系统</router-link
              >
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/"
                class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                首页
              </router-link>
              <router-link
                v-if="isLoggedIn"
                to="/create"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                写文章
              </router-link>
            </div>
          </div>
          <!-- 移动端菜单按钮 -->
          <div class="flex items-center sm:hidden">
            <button
              @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">打开主菜单</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <!-- 桌面端菜单 -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <template v-if="!isLoading">
              <div v-if="isLoggedIn" class="flex items-center space-x-4">
                <div class="flex items-center">
                  <span class="text-gray-700 mr-2">{{
                    userInfo?.username
                  }}</span>
                  <button
                    @click="logout"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    退出
                  </button>
                </div>
              </div>
              <div v-else class="flex items-center space-x-4">
                <router-link
                  to="/login"
                  class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  登录
                </router-link>
                <router-link
                  to="/register"
                  class="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  注册
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="isMobileMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
            @click="closeMobileMenu"
          >
            首页
          </router-link>
          <router-link
            v-if="isLoggedIn"
            to="/create"
            class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            @click="closeMobileMenu"
          >
            写文章
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div v-if="isLoggedIn" class="flex items-center px-4">
            <div class="flex-shrink-0">
              <span class="text-gray-700">{{ userInfo?.username }}</span>
            </div>
            <div class="ml-3">
              <button
                @click="logout"
                class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
              >
                退出
              </button>
            </div>
          </div>
          <div v-else class="space-y-1">
            <router-link
              to="/login"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              @click="closeMobileMenu"
            >
              登录
            </router-link>
            <router-link
              to="/register"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              @click="closeMobileMenu"
            >
              注册
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="w-full flex-1 flex">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import axios from "axios";

const router = useRouter();
const userStore = useUserStore();
const isLoggedIn = ref(false);
const userInfo = ref<any>(null);
const isMobileMenuOpen = ref(false);
const isLoading = ref(true);

const fetchUserInfo = async () => {
  try {
    const response = await axios.get("http://localhost:26001/users/me", {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    userInfo.value = response.data;
    isLoggedIn.value = true;
  } catch (error) {
    console.error("获取用户信息失败:", error);
    isLoggedIn.value = false;
    userInfo.value = null;
  } finally {
    isLoading.value = false;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// 监听路由变化，关闭移动端菜单
watch(
  () => router.currentRoute.value,
  () => {
    closeMobileMenu();
  }
);

// 监听登录状态变化
watch(
  () => userStore.token,
  (newToken) => {
    isLoggedIn.value = !!newToken;
    if (newToken) {
      fetchUserInfo();
    } else {
      userInfo.value = null;
      isLoading.value = false;
    }
  }
);

onMounted(async () => {
  if (userStore.token) {
    await fetchUserInfo();
  } else {
    isLoading.value = false;
  }
});

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
* {
  box-sizing: border-box;
}
</style>
