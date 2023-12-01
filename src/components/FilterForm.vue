<template>
  <div>
    <h2>Поиск по таблице</h2>
    <form @submit.prevent>
      <fieldset class="payment">
        <CustomSelect 
        :params="dietFilters" 
        label="Отобразить записи со статусом оплаты:" 
        :id="'payment-filter'"
        v-model="filterOptions.paymentStatusFilter"
        @change="updateFilterOption"
        @update:model-value="newValue => filterOptions.paymentStatusFilter = newValue"
        />
      </fieldset>
      <fieldset class="diet">
        <CustomSelect 
        :params="statusFilters"
        label="Отобразить записи со статусом диеты:"
        :id="'status-filter'"
        v-model="filterOptions.dietStatusFilter"
        @change="updateFilterOption"
        @update:model-value="newValue => filterOptions.dietStatusFilter = newValue"
        />
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { FILTER_DIET_STATUSES } from '../helpers/filterClients'
import CustomSelect from '@/components/CustomSelect.vue';

const emit = defineEmits(['setFilterParams']);

const filterOptions = ref({
  dietStatusFilter: '',
  paymentStatusFilter: ''
})

const dietFilters = [
  {
    value: "paid",
    text: "Оплачен"
  },
  {
    value: "not paid",
    text: "Не оплачен"
  }
];

const statusFilters = [
  {
    value: FILTER_DIET_STATUSES.NOT_STARTED,
    text: 'Начнётся через X дней'
  },
  {
  value: FILTER_DIET_STATUSES.END_TODAY,
  text: 'Закончится сегодня'
  },
  {
    value: FILTER_DIET_STATUSES.END_TOMORROW,
    text: 'Закончится завтра'
  },
  {
    value: FILTER_DIET_STATUSES.STARTED,
    text: 'Закончится через X дней'
  },
  {
    value: FILTER_DIET_STATUSES.ENDED,
    text: 'Закончилась X дней назад'
  }
]

const updateFilterOption = () => {
  emit('setFilterParams', filterOptions)
}
</script>


<style>
  form {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  fieldset {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .payment select {
    width: 150px;
  }

  .diet select {
    width: 250px;
  }
</style>
