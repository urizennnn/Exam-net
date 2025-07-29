<script setup lang="ts">
import AdminLayout from '../components/AdminLayout.vue';
</script>

<template>
  <AdminLayout>
    <section class="w-full h-auto bg-white p-4">
      <h1 class="text-2xl font-bold mb-4 text-center">Settings</h1>
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold mb-2">Roles & Permissions</h2>
          <p class="text-sm text-gray-700">Configure user roles and access levels.</p>
        </div>
        <div>
          <h2 class="text-lg font-semibold mb-2">Branding Options</h2>
          <p class="text-sm text-gray-700">Set logo and theme colors for the portal.</p>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>
