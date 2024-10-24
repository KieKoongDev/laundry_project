<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full bg-gradient-to-tr from-indigo-500 to-sky-500 min-h-screen">

    <header>
      <div class="w-full py-2 px-5 flex justify-center items-center gap-4">
       <div class="w-32 h-32 rounded-full">
        <img src="/src/assets/icons/5.png" alt="logo" class="w-full h-full object-cover" />
       </div>
       <p class="text-3xl text-white font-bold">MooDeng Laundry</p>
      </div>
    </header>

    <RouterView />
  </div>
</template>
