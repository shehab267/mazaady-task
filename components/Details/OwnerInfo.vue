<template>
  <BaseCard>
    <div class="px-5 py-6">
      <span class="mb-4 flex h-[100px] w-[100px] items-center">
        <img
          src="/assets/img/profile.jpeg"
          alt="owner"
          class="h-[100px] w-[100px] rounded-3xl object-cover"
        />
      </span>
      <div>
        <div class="mb-6 flex flex-col gap-3">
          <h1 class="text-2xl font-bold text-gray-dark">Hala Ahmed</h1>
          <p class="text-sm text-gray-dark">
            I am Hala Ahmed, I am the owner of the local brand called Beauty
            which is for Mackeup and Skin Care.
          </p>
        </div>
        <div class="mb-6 flex items-center justify-center gap-3">
          <BaseBadge class="w-[108px] bg-orange-light text-secondary">
            <div class="flex items-center gap-[6px]">
              <img
                src="/assets/icons/user-tick.svg"
                alt="following icons"
                class="w-[20px]"
              />
              <div class="flex flex-col text-sm">
                <span class="font-bold text-gray-dark">5</span>
                <span>Following</span>
              </div>
            </div>
          </BaseBadge>
          <BaseBadge class="w-[108px] bg-orange-light text-secondary">
            <div class="flex items-center gap-[6px]">
              <img
                src="/assets/icons/follower.svg"
                alt="follower icons"
                class="w-[20px]"
              />
              <div class="flex flex-col text-sm">
                <span class="font-bold text-gray-dark">20</span>
                <span>Follower</span>
              </div>
            </div>
          </BaseBadge>
          <BaseBadge class="w-[108px] bg-orange-light text-secondary">
            <div class="flex items-center gap-[6px]">
              <img
                src="/assets/icons/magic-star.svg"
                alt="star icons for rating"
                class="w-[20px]"
              />
              <div class="flex flex-col text-sm">
                <div>
                  <span class="font-bold text-gray-dark">4.2</span>
                  <span class="ml-2 text-xs font-normal text-gray-light"
                    >(15)</span
                  >
                </div>
                <span>Rate</span>
              </div>
            </div>
          </BaseBadge>
        </div>
        <div>
          <BaseButton class="w-full">Follow</BaseButton>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts"></script>

<style scoped></style>
