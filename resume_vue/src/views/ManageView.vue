<template>
  <div class="manage-view">
    <Manage />
  </div>
</template>

<script setup lang="ts">
import Manage from '../components/Manage.vue'
</script>

<style scoped>
.manage-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f8faff 100%);
}
</style>
