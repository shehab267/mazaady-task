<script lang="ts" setup>
const nav = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Form',
    path: '/form',
  },
  {
    name: 'Gifts',
    path: '/gifts',
  },
];
</script>

<template>
  <nav class="hidden text-lg font-normal text-[#828282] lg:flex">
    <ul class="flex items-center gap-10">
      <li v-for="link in nav" class="relative">
        <NuxtLink :to="link.path">
          {{ link.name }}
          <span
            class="cust-indi absolute -bottom-6 right-1/2 hidden h-1.5 w-full translate-x-1/2 rounded-t-lg bg-[#D20653]"
          ></span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style>
nav .router-link-active {
  @apply font-bold text-[#D20653];
}

nav .router-link-active span {
  @apply flex;
}
</style>
