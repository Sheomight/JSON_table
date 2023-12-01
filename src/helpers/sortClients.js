import { DIET_STATUSES } from './addStatuses'
import { computed } from 'vue'
import { findIndexByStatus, getPerfectDatesIndex } from './getIndex'

export const useSortClients = (clientsWithStatuses, isSortingForBigger) => {

  const sortedClients = computed(() => {
    if (isSortingForBigger === null) {
      return clientsWithStatuses
    }

    const notStartedDiets = clientsWithStatuses.filter(
      (client) => {
        let bestIndex = findIndexByStatus(client.dates, DIET_STATUSES.NOT_STARTED)
        return client.dates[bestIndex].statusInfo.status === DIET_STATUSES.NOT_STARTED
      }
    )
    const startedDiets = clientsWithStatuses.filter(
      (client) => {
        let bestIndex = findIndexByStatus(client.dates, DIET_STATUSES.STARTED)
        return client.dates[bestIndex].statusInfo.status === DIET_STATUSES.STARTED
      }
      )
      const endedDiets = clientsWithStatuses.filter(
        (client) => {
        let bestIndex = findIndexByStatus(client.dates, DIET_STATUSES.ENDED)
        return client.dates[bestIndex].statusInfo.status === DIET_STATUSES.ENDED
      }
    )

    return [
      ...notStartedDiets.sort(
        (a, b) => {
          let indexA = getPerfectDatesIndex(a, DIET_STATUSES.NOT_STARTED);
          let indexB = getPerfectDatesIndex(b, DIET_STATUSES.NOT_STARTED);
          return new Date(b.dates[indexB].start_date) - new Date(a.dates[indexA].start_date)
        }
      ),
      ...startedDiets.sort(
        (a, b) => {
          let indexA = getPerfectDatesIndex(a, DIET_STATUSES.STARTED);
          let indexB = getPerfectDatesIndex(b, DIET_STATUSES.STARTED);
          return new Date(a.dates[indexA].end_date) - new Date(b.dates[indexB].end_date)
        }
      ),
      ...endedDiets.sort(
        (a, b) => {
          let indexA = getPerfectDatesIndex(a, DIET_STATUSES.ENDED);
          let indexB = getPerfectDatesIndex(b, DIET_STATUSES.ENDED);
          return new Date(b.dates[indexB].end_date) - new Date(a.dates[indexA].end_date)
        }
      ),
      ]
  })
  return sortedClients
}