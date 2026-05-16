<template>
  <div class="personal-view">
    <Personal />
  </div>
</template>

<script setup lang="ts">
import Personal from '../components/Personal.vue'
</script>

<style scoped>
.personal-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f8faff 100%);
}
</style>
