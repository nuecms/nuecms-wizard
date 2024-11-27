<template>
  <footer class="py-6 px-4 sm:px-6 md:px-8 lg:px-10 border-t border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div class="text-center md:text-left">
          <p class="text-gray-600 text-sm">
            &copy; {{ currentYear }} NueCMS. All rights reserved.
          </p>
        </div>
        <!-- Navigation Links -->
        <nav class="flex flex-wrap justify-center md:justify-end gap-4">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="text-gray-600 hover:text-gray-900 text-sm"
          >
            {{ item.name }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface NavItem {
  name: string;
  href: string;
}

const props = withDefaults(defineProps<{
  currentYear?: number;
  navItems?: NavItem[];
}>(), {
  currentYear: () => new Date().getFullYear(),
  navItems: () => [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Contact Us', href: '#' },
  ],
});

const year = computed(() => props.currentYear);
</script>
