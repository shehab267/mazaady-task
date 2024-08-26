<template>
  <BaseCard>
    <div class="px-5 py-6">
      <div>
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-2xl font-bold text-gray-dark">QR Code</h3>
          <div class="flex gap-6">
            <img
              class="h-6 w-6 cursor-pointer"
              src="/assets/icons/eye.svg"
              alt="eye icon"
            />
            <img
              class="h-6 w-6 cursor-pointer"
              src="/assets/icons/share.svg"
              alt="share icon"
            />
            <img
              class="h-6 w-6 cursor-pointer"
              src="/assets/icons/download.svg"
              alt="download icon"
            />
            <div
              class="rounded-full bg-[#F6F4F5] p-1 lg:hidden"
              :class="{
                'bg-[#FBE7EE]': open,
              }"
              @click="toggleList"
            >
              <img
                class="min-w-6 cursor-pointer duration-300"
                :class="{
                  'rotate-180 transform': !open,
                }"
                src="/assets/icons/arrow-vertical.svg"
                alt="arrow icon"
              />
            </div>
          </div>
        </div>
        <div
          class="grid min-h-0 duration-300 lg:grid-rows-[1fr]"
          :class="{
            'grid-rows-[0fr]': !open,
            'grid-rows-[1fr]': open,
          }"
        >
          <div class="overflow-hidden">
            <BaseBadge class="mb-4 bg-orange-light">
              <div class="flex items-center gap-2">
                <img
                  class="cursor-pointer"
                  src="/assets/icons/download-yellow.svg"
                  alt="download icon"
                />

                <span class="text-xs"
                  >Download the QR code or share it with your friends.</span
                >
              </div>
            </BaseBadge>
            <div
              class="rounded-[20px] bg-gradient-to-r from-primary to-secondary p-5"
            >
              <div
                class="flex flex-col items-center gap-4 rounded-[20px] bg-white p-3"
              >
                <img
                  class="cursor-pointer"
                  src="/assets/icons/logo.svg"
                  alt="logo"
                />
                <span class="text-2xl font-bold text-gray-dark"
                  >Hala Ahmed</span
                >
                <span>
                  <img
                    class="cursor-pointer"
                    src="/assets/img/qr.jpeg"
                    alt="qr"
                    width="135"
                    height="135"
                  />
                </span>
                <span>Follow Us On Mazaady</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
const open = ref<Boolean>(false);
const toggleList = (): void => {
  open.value = !open.value;
};
</script>

<style scoped></style>
