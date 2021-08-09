import moment from "moment";

type ReturnDate = {
  differenceToNextTime: Date | string;
  hasRecentlyPassed: boolean;
  timeRemaining: number;
};

export const getTimeDiff = (time: Date | string): ReturnDate => {
  const utcTimeNow = moment.utc().format("HH:mm:ss");
  let timeToMoment = moment(time);

  if (!timeToMoment.isValid()) {
    return {
      differenceToNextTime: 'N/A',
      hasRecentlyPassed: false,
      timeRemaining: 0,
    };
  }

  let timeToHours = timeToMoment.utc().format("HH:mm:ss");

  const startTime = moment.utc(utcTimeNow, "HH:mm a");
  const endTime = moment.utc(timeToHours, "HH:mm a");

  const hourDiff = startTime.diff(endTime, "hours");

  let hasRecentlyPassed = false;

  if (startTime.isAfter(endTime) && hourDiff > 2) {
    endTime.add(1, "days");
  }

  const timeRemaining = startTime.diff(endTime);  
  if(timeRemaining > -1) {
    hasRecentlyPassed = true;
  }
  
  return {
    differenceToNextTime: startTime.to(endTime),
    hasRecentlyPassed,
    timeRemaining,
  };
};
