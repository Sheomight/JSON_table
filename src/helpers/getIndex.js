import { DIET_STATUSES } from "./addStatuses";

export const getPerfectDatesIndex = (diets, status) => {
  let days = 0;
  let index = null;

  if (status === DIET_STATUSES.NOT_STARTED) {

    for (let i = 0; i < diets.dates.length; i++) {
      if (diets.dates[i].statusInfo.days >= days && diets.dates[i].statusInfo.status === status) {
        index = i;
        days = diets.dates[i].statusInfo.days;
      }
    }

    return index
    
  } else if (status === DIET_STATUSES.STARTED) {

    for (let i = 0; i < diets.dates.length; i++) {
      if (diets.dates[i].statusInfo.days >= days && diets.dates[i].statusInfo.status === status) {
        index = i;
        days = diets.dates[i].statusInfo.days;
      }
    }

    return index

  } else {

    for (let i = 0; i < diets.dates.length; i++) {
      if (days <= diets.dates[i].statusInfo.days) {
        index = i;
        days = diets.dates[i].statusInfo.days;
      }
    }

    return index

  }
}

export const findIndexByStatus = (dates, status) => {
  let notStartedIndex = null;
  let startedIndex = null;

  for (let i = 0; i < dates.length; i++) {
    if (dates[i].statusInfo.status === DIET_STATUSES.NOT_STARTED) {
      notStartedIndex = i;
    } else if (dates[i].statusInfo.status === DIET_STATUSES.STARTED) {
      startedIndex = i;
    }
  }

  if (status === DIET_STATUSES.NOT_STARTED && notStartedIndex !== null) {
    return notStartedIndex
  } else if (startedIndex !== null) {
    return startedIndex
  } else {
    return 0
  }
}