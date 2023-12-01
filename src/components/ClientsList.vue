<template>
  <h2 v-if="clients.length == 0">Записей нет</h2>
  <tr v-for="client in clients" :key="client.o_id">
    <ClientItem :client="client" />
  </tr>
</template>

<script setup>
import ClientItem from '@/components/ClientItem.vue';
import { defineProps } from 'vue';

defineProps({
  clients: {
      type: Object,
      required: true
    }
})
</script>


