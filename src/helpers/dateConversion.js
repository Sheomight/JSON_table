import { dateDiff, DIET_STATUSES } from "./addStatuses";

export const getShortDate = (date) => {
  let shortStart = `${new Date(date.start_date).getUTCDate()} ${new Date(date.start_date).toLocaleString('default', { month: 'short' })}`;
  let shortEnd = `${new Date(date.end_date).getUTCDate()} ${new Date(date.end_date).toLocaleString('default', { month: 'short' })}`;
  let period = dateDiff(date.end_date, date.start_date);

  return `${shortStart} - ${shortEnd} (${period})`
};

export const getStatusMessage = (index, dates) => {
  const dateStatus = JSON.parse(JSON.stringify(dates[index].statusInfo))

  if (dateStatus.status === DIET_STATUSES.NOT_STARTED) {
    return `начнётся через ${dateStatus.days} ${setCorrectDayForm(dateStatus.days)}`

  } else if (dateStatus.status === DIET_STATUSES.STARTED) {

    if ( dateStatus.days >= 2) {
      return `закончится через ${dateStatus.days} ${setCorrectDayForm(dateStatus.days)}`

    } else if (dateStatus.days == 1) {
      return `закончится завтра`

    } else {
      return `закончится сегодня`
    }
  } else {
    return `закончилась ${dateStatus.days} ${setCorrectDayForm(dateStatus.days)} назад`
  }
};

const setCorrectDayForm = (days) => {

  let newDays = String(days).slice(length-1)

  if ((newDays >= 2 && newDays <= 4) && (days < 10 || days > 20)) {
    return 'дня'
  } else if (newDays == 1 && days != 11) {
    return 'день'
  } else {
    return 'дней'
  }
}