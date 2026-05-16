<template>
  <div class="settings-view">
    <Settings />
  </div>
</template>

<script setup lang="ts">
import Settings from '../components/Settings.vue'
</script>

<style scoped>
.settings-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f8faff 100%);
}
</style>
