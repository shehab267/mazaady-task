<template>
  <div class="mb-6 flex items-start justify-between">
    <div class="flex items-center gap-2">
      <div class="relative min-w-[87px]">
        <img :src="$props.src" :alt="$props.title" class="w-40 object-cover" />
        <div class="absolute left-2 top-2 rounded-full bg-white p-1 md:hidden">
          <ProductsFavorite :favorited="$props.favorited" />
        </div>
        <span
          v-if="$props.badgeTitle"
          class="absolute bottom-0 right-0 flex h-2/5 w-3/4 items-center justify-center rounded-br-[34px] rounded-tl-[34px] text-[8px] text-white sm:text-base md:p-3"
          :class="{
            'bg-[#D20653]': $props.live,
            'bg-[#ff9320]': $props.hot,
          }"
          >{{ $props.badgeTitle }}</span
        >
      </div>
      <div class="mb-2">
        <h2 class="line-clamp-1 text-sm text-gray-light md:text-lg">
          {{ $props.title }}
        </h2>
        <div class="mb-2 flex items-center gap-1">
          <span class="text-sm text-gray-light md:text-lg">starting price</span>
          <span class="text-sm font-bold text-gray-dark md:text-2xl">{{
            $props.price
          }}</span>
        </div>
        <div class="flex flex-col gap-1 md:flex-row md:items-center">
          <span class="text-sm text-gray-light md:text-lg">Lots Starts In</span>
          <div class="flex flex-wrap items-center gap-4">
            <BaseBadge
              class="text-nowrap bg-orange-light text-xs font-bold text-orange-dark max-md:p-1 md:text-xl"
              v-for="(lot, i) in $props.lots"
              :key="i"
              >{{ lot }}</BaseBadge
            >
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:block">
      <ProductsFavorite :favorited="$props.favorited" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  price: String,
  live: Boolean,
  hot: Boolean,
  badgeTitle: String,
  lots: Array,
  src: String,
  favorited: Boolean,
});
</script>

<style scoped></style>
