<template>
  <div class="post-list w-3/4 max-w-800 mx-auto px-4 py-8">
    <div
      v-for="post in posts"
      :key="post.item_id"
      class="post-card bg-white shadow-md rounded-lg mb-6 p-6"
    >
      <div class="card-header text-lg font-semibold mb-2">
        {{ post.name }}
      </div>
      <div class="post-content text-gray-700 mb-4">
        {{ post.content }}
      </div>
      <div class="post-meta text-gray-500 text-sm">
        发布时间：{{ formatDate(post.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Post {
  item_id: number;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const posts = ref<Post[]>([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:26001/items");
    console.log(response.data);
    posts.value = response.data;
  } catch (error) {
    console.error("获取文章列表失败:", error);
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

onMounted(() => {
  fetchPosts();
});
</script>
