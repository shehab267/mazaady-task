<template>
  <header class="bg-white px-20 max-md:max-w-full max-md:px-5">
    <div
      class="alley flex items-center justify-between py-2 max-md:max-w-full max-md:px-5 lg:py-4"
    >
      <div class="flex items-center gap-2 lg:gap-8">
        <AtomIconMenu />
        <AtomIconLogo />
        <HeaderNavigation />
      </div>

      <div class="flex items-center gap-4 lg:gap-6">
        <div class="flex items-center gap-4">
          <AtomIconSearch />
          <AtomIconBell />
          <img src="/avatar.png" alt="avatar image" class="h-[32px]" />
        </div>
        <div class="hidden items-center gap-8 lg:flex">
          <HeaderAdd :placeholder="'Add New Product'" />
          <HeaderI18n />
        </div>
      </div>
    </div>
  </header>
</template>
