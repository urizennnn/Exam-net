<template>
  <section class="flex flex-col w-full bg-zinc-300 h-[100dvh] text-black pb-4">
    <nav class="flex items-center z-50 justify-between px-5 bg-gray-800 cursor-pointer">
      <img src="@root/assets/svg/Asset 11.svg" alt="logo" class="h-[30px]">
      <div class="flex items-center gap-4">
        <RouterLink to="/admin/dashboard" class="text-white">
          Dashboard
        </RouterLink>
        <RouterLink to="/admin/users" class="text-white">
          Manage Users
        </RouterLink>
        <RouterLink to="/admin/complaints" class="text-white">
          Complaints
        </RouterLink>
      </div>
    </nav>
    <section class="flex-1 bg-zinc-300">
      <slot />
    </section>
  </section>
</template>
