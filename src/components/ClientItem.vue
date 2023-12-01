<template>
  <td class="client__id">{{ props.client.o_id }}</td>
  <td class="client__name">{{ props.client.client_name }}</td>
  <td class="client__tariff">
    <template 
      v-for="tariff in props.client.tariff"
      :key="tariff"
    >
      {{ tariff }}
      <hr>
    </template>
  </td>

  <td>{{ props.client.address }}</td>
  <td>{{ props.client.phone }}</td>

  <td class="client__date">
    <div 
      v-for="(date, index) in props.client.dates"
      :key="index"
    >
      {{ getShortDate(date) }}
    </div>
  </td>

  <td 
    class="client__payment"
    :class="{
      'client__payment_green': props.client.pay_status == 'Оплачен'
    }"
  >
    <div 
      v-if="props.client.order_sum"
    >
      Стоимость {{ props.client.order_sum }}
    </div>
    <div>
      {{ props.client.pay_status }}
    </div>
    <div 
      v-if="props.client.pay_status != 'Оплачен'"
    >
      Долг {{ props.client.order_sum - props.client.order_payed }}
    </div>
  </td>
  <td>Оплата картой</td>
  <td>{{ props.client.courier_comment }}</td>
  <td>{{ props.client.inner_comment }}</td>
  <td class="client__status">
    <template 
      v-for="tariff, index in props.client.tariff"
      :key="index"
    >
      {{ getStatusMessage(index, dates) }}
      <hr>
    </template>
  </td>
</template>

<script setup>
import { getShortDate, getStatusMessage } from '@/helpers/dateConversion';
import { ref, defineProps } from 'vue';


const props = defineProps({
  client: {
      type: Object
  }
})

const dates = ref(props.client.dates)
</script>

<style>
hr {
  color: #000;
  background-color: #000;
  border: none;
  height: 1px;
}

td hr:last-child {
  display: none;
}

.client__id {
  background-color: rgba(118, 255, 118, 0.48);
}

.client__payment {
  background-color: rgba(255, 52, 52, 0.506);
}

.client__payment_green {
  background-color: rgba(0, 255, 0, 0.48);
}

.client__tariff {
  width: 150px;
}

tbody tr:nth-child(odd) .client__status {
  background-color: rgba(0, 102, 255, 0.405);
}

tbody tr:nth-child(even) .client__status {
  background-color: rgba(51, 184, 255, 0.405);
}
</style>