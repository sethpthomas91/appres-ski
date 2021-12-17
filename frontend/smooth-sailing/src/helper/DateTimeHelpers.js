
// helper function
const determineDateWithinHoulryRange = (userDate, eventDate, dayLimit=5) => {
  const userStandardEpochTime = new Date(userDate).getTime()
  const eventStandardEpochTime = new Date(eventDate).getTime()
  // check if the date has passed
  if (userStandardEpochTime > eventStandardEpochTime) {
    return false
  } else {
    // convert the dayLimit to milliseconds
    const timeLimit = dayLimit * (1000*60*60*24)
    const cutOffTime = userStandardEpochTime + timeLimit
    // if the vent time iss outside of the time range it will return false, if it is within the time range it will return true
    return eventStandardEpochTime > cutOffTime ? false : true
  }

}

const dateTimeHelpers = {
  determineDateWithinHoulryRange,
}

export default dateTimeHelpers 