<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  const { user } = props;
</script>

<template>
  <div class="flex justify-center">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="cursor-pointer">
        <div class="flex justify-center items-center content-center w-8 h-8 bg-white rounded-full text-black">
          <img
            v-if="user.user_metadata?.avatar_url"
            :src="user.user_metadata.avatar_url"
            alt="avatar image" />
          <i
          v-else
          src="~/assets/images/avatar.svg"
          alt="default avatar image" class="text-black group-hover:text-tawny-port-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#b42273" viewBox="0 0 24 24" stroke-width="1.5" stroke="#b42273" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </i>
        </div>
      </label>
      <ul
        tabindex="0"
        class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li v-if="user">{{ user.email }}</li>
        <li><NuxtLink to="/account">Account</NuxtLink></li>
        <li><UserAccountSignout /></li>
        <UserAccountSwitch />
      </ul>
    </div>
  </div>
</template>
