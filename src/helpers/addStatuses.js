const msecInDay = 86400000
export const DIET_STATUSES = {
  NOT_STARTED: 'not-started',
  STARTED: 'started',
  ENDED: 'ended',
}

export const dateDiff = (dateA, dateB) => {
  let different = new Date(new Date(dateA).toDateString()) - new Date(new Date(dateB).toDateString());
  let daysDif = different / msecInDay;
  return daysDif;
};

const getDietDaysByStatus = (status, dietDates) => {
  const { start_date, end_date } = dietDates
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  const now = new Date()

  if (status === DIET_STATUSES.NOT_STARTED) {
    return dateDiff(startDate, now)
  } else if (status === DIET_STATUSES.ENDED) {
    return dateDiff(now, endDate) 
  } else {
    return dateDiff(endDate, now) 
  }
}

const getDietStatus = (dietDates) => {
  const { start_date, end_date } = dietDates
  const startDate = new Date(new Date(start_date).toDateString())
  const endDate = new Date(new Date(end_date).toDateString())
  const now = new Date(new Date().toDateString())
  const isDietStarted = now >= startDate
  const isDietEnded = now > endDate

  if (!isDietStarted) {
    return DIET_STATUSES.NOT_STARTED
  } else if (isDietEnded) {
    return DIET_STATUSES.ENDED
  } else {
    return DIET_STATUSES.STARTED
  }
}

export const addStatusesToClients = (clients) => {
  return clients.map((client) => {
    return {
      ...client,
      dates: client.dates.map((date) => {
        const status = getDietStatus(date)
        const days = getDietDaysByStatus(status, date)

        return {
          ...date,
          statusInfo: {
            status: getDietStatus(date),
            days: days,
          },
        }
      }),
    }
  })
}
