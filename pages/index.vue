<template>
  <Header />
  <main class="container mx-auto px-4 py-12 xl:px-21">
    <div class="grid grid-cols-8 gap-6">
      <aside class="col-span-8 flex flex-col gap-6 lg:col-span-3">
        <DetailsOwnerInfo />
        <DetailsQRDetails />
      </aside>
      <BaseCard class="col-span-8 bg-white lg:col-span-5">
        <Products />
      </BaseCard>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped></style>
