import { computed } from "vue";
import { DIET_STATUSES } from "./addStatuses";
import { findIndexByStatus } from "./getIndex";

export const FILTER_DIET_STATUSES = {
  NOT_STARTED: 'not-started',
  STARTED: 'started',
  END_TODAY: 'end-today',
  END_TOMORROW: 'end-tomorrow',
  ENDED: 'ended'
}

export const useFilteredClients = (params, sortedClients) => {

  const sortedAndFilteredClients = computed(() => {

    if (!params.value.paymentStatusFilter && !params.value.dietStatusFilter) {
      return sortedClients
    } else {

      let filteredClients = [...sortedClients];

      if (params.value.paymentStatusFilter) {
        filteredClients = filteredClients.filter( client => {
          if (params.value.paymentStatusFilter === 'paid') {
            return client.pay_status === 'Оплачен'
          } else if (params.value.paymentStatusFilter === 'not paid') {
            return client.pay_status === 'Неоплачен ч.'
          }
        });
      }
      if (params.value.dietStatusFilter) {
        filteredClients = filteredClients.filter( client => {
          if (params.value.dietStatusFilter === FILTER_DIET_STATUSES.NOT_STARTED) {
          const index = findIndexByStatus(client.dates, DIET_STATUSES.NOT_STARTED);
          return client.dates[index].statusInfo.status === DIET_STATUSES.NOT_STARTED
        } else if (params.value.dietStatusFilter === FILTER_DIET_STATUSES.END_TODAY) {
          const index = findIndexByStatus(client.dates, DIET_STATUSES.STARTED);
          return client.dates[index].statusInfo.status === DIET_STATUSES.STARTED && client.dates[index].statusInfo.days === 0
        } else if (params.value.dietStatusFilter === FILTER_DIET_STATUSES.END_TOMORROW) {
          const index = findIndexByStatus(client.dates, DIET_STATUSES.STARTED);
          return client.dates[index].statusInfo.status === DIET_STATUSES.STARTED && client.dates[index].statusInfo.days === 1
        } else if (params.value.dietStatusFilter === FILTER_DIET_STATUSES.STARTED) {
          const index = findIndexByStatus(client.dates, DIET_STATUSES.STARTED);
          return client.dates[index].statusInfo.status === DIET_STATUSES.STARTED
        } else if (params.value.dietStatusFilter === FILTER_DIET_STATUSES.ENDED) {
          const index = findIndexByStatus(client.dates, DIET_STATUSES.ENDED);
          return client.dates[index].statusInfo.status === DIET_STATUSES.ENDED
        }
        });
      }
      return filteredClients
    }
  })

  return sortedAndFilteredClients
}