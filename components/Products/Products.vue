<template>
  <section class="p-6">
    <div>
      <div class="mb-[18px] flex items-center md:justify-between">
        <ProductsFilter />
        <HeaderAdd :placeholder="'Add Review'" class="max-sm:hidden" />
      </div>
      <div>
        <div class="mb-3 flex items-center gap-2">
          <h1 class="text-gray-dark text-3xl font-bold">Products</h1>
          <span class="text-gray-light text-sm">(12)</span>
        </div>
        <ProductsProduct
          v-for="product in products"
          :key="product.id"
          :title="product.title"
          :lots="product.lots"
          :price="product.price"
          :live="product.live ? true : false"
          :hot="product.hot ? true : false"
          :badgeTitle="product.badgeTitle"
          :src="product.src"
          :favorited="product.favorited"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const products = [
  {
    id: 1,
    title: 'Outfit, new, used for only one time',
    lots: ['2 Days', '10 Hours', '50 Minutes'],
    live: true,
    price: '1000 EGP',
    badgeTitle: 'Live auction',
    src: 'item1.png',
    favorited: false,
  },
  {
    id: 2,
    title: 'Six-piece clothing set (blouse - pants - hat and ...',
    lots: ['2 Days', '10 Hours', '50 Minutes'],
    live: true,
    price: '1000 EGP',
    badgeTitle: 'Live auction',
    src: 'item2.png',
    favorited: true,
  },
  {
    id: 3,
    title: 'Jeep Car, new, used for only one time',
    lots: ['2 Days', '10 Hours', '50 Minutes'],
    hot: true,
    price: '1000 EGP',
    badgeTitle: 'hot sale',
    src: 'item3.png',
    favorited: false,
  },
  {
    id: 4,
    title: 'Six-piece clothing set (blouse - pants - hat and ...',
    lots: ['2 Days', '10 Hours', '50 Minutes'],
    live: true,
    price: '1000 EGP',
    badgeTitle: 'Live auction',
    src: 'item4.png',
    favorited: true,
  },
  {
    id: 5,
    title: 'Outfit, new, used for only one time',
    lots: ['2 Days', '10 Hours', '50 Minutes'],
    live: true,
    price: '1000 EGP',
    badgeTitle: 'Live auction',
    src: 'item1.png',
    favorited: true,
  },
];
</script>

<style scoped></style>
