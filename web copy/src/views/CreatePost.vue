<template>
  <el-card class="create-post-card">
    <template #header>
      <div class="card-header">
        <span>创建文章</span>
      </div>
    </template>
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="10" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">发布</el-button>
        <el-button @click="$router.push('/')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";

const router = useRouter();

const form = ref({
  title: "",
  content: "",
});

const handleCreate = async () => {
  try {
    await axios.post("http://localhost:26001/items/", form.value);
    ElMessage.success("文章发布成功");
    router.push("/");
  } catch (error) {
    ElMessage.error("文章发布失败");
  }
};
</script>

<style scoped>
.create-post-card {
  max-width: 800px;
  margin: 20px auto;
}
</style>
