<template>
  <FilterForm @setFilterParams="startFilter"/>
  <table>
    <thead>
      <tr>
        <th>ID пользователя</th>
        <th>Имя пользователя</th>
        <th>Тариф</th>
        <th>Адрес</th>
        <th>Номер телефона</th>
        <th>Сроки подписки</th>
        <th>Информация об оплате</th>
        <th>Способ оплаты</th>
        <th>Комментарий курьера</th>
        <th>Внутренний комментарий</th>
        <th 
          class="sort__status"
          :class="{
            sort__status_down: isSortingForBigger === true,
            sort__status_up: isSortingForBigger === false
          }"
          @click="startSorting"
        >Статус</th>
      </tr>
    </thead>
    <tbody>
      <ClientsList :clients="filteredAndSortedClients" />
    </tbody>
  </table>
</template>

<script setup>
import Clients from './assets/data.json';
import { addStatusesToClients } from './helpers/addStatuses';
import { useSortClients } from './helpers/sortClients';
import { useFilteredClients } from './helpers/filterClients'
import { computed, ref } from 'vue';
import ClientsList from '@/components/ClientsList.vue';
import FilterForm from '@/components/FilterForm.vue';


  const clientsWithStatuses = addStatusesToClients(Clients);
  let isSortingForBigger = ref(null);

  let filterOptions = ref({
    paymentStatusFilter: null,
    dietStatusFilter: null
  })
    
  const sortedClients = computed(() => {
    if (isSortingForBigger.value === false) {
      return useSortClients(clientsWithStatuses, isSortingForBigger.value).value.reverse()
    } else {
      return useSortClients(clientsWithStatuses, isSortingForBigger.value).value
    }
  })
    
  let filteredAndSortedClients = computed( () => {
    return useFilteredClients(filterOptions, sortedClients.value).value
  })
    
  const startSorting = () => {
    isSortingForBigger.value = !isSortingForBigger.value;
  }
  const startFilter = (params) => {
    filterOptions.value = params.value;
  }
</script>

<style>
table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #000000;
  border-collapse: collapse;
}

th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #000000;
}

td {
  border: 1px solid #000000;
  padding: 5px;
  text-align: center;
}

form {
  margin: 10px 0;
  padding: 5px;
}

.sort-label {
  margin-right: 5px;
}

.sort__status{
  position: relative;
  cursor: pointer;
}
.sort__status_down::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 20px;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  background: url('./assets/images/arrow-down_icon-icons.com_72377.svg') no-repeat 50% 50%;
  background-size: contain;
}

.sort__status_up::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 20px;
  right: 10%;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  background: url('./assets/images/arrow-down_icon-icons.com_72377.svg') no-repeat 50% 50%;
  background-size: contain;
}
</style>
