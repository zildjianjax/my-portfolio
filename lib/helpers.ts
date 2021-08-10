import moment from "moment";

type ReturnDate = {
  differenceToNextTime: Date | string;
  hasRecentlyPassed: boolean;
  timeRemaining: number;
  hoursDiff: number;
  minutesDiff: number;
  secondsDiff: number;
  isFiveMinutesRemaining: boolean;
  isThirthyMinutesRemaing: boolean;
};

export const getTimeDiff = (time: Date | string): ReturnDate => {
  const utcTimeNow = moment.utc();
  let timeToMoment = moment(time);

  if (!timeToMoment.isValid()) {
    return {
      differenceToNextTime: "N/A",
      hasRecentlyPassed: false,
      isFiveMinutesRemaining: false,
      isThirthyMinutesRemaing: false,
      timeRemaining: 0,
      hoursDiff: 0,
      minutesDiff: 0,
      secondsDiff: 0,
    };
  }

  let timeToHours = timeToMoment.utc().format("HH:mm:ss");

  const startTime = moment.utc(utcTimeNow.format("HH:mm:ss"), "HH:mm a");
  const endTime = moment.utc(timeToHours, "HH:mm a");

  const hourDiff = startTime.diff(endTime, "hours");
  const minuteDiff = startTime.diff(endTime, "minutes");

  let hasRecentlyPassed = false;
  let isFiveMinutesRemaining = false;
  let isThirthyMinutesRemaing = false;

  if (startTime.isAfter(endTime) && hourDiff >= 0 && minuteDiff >= 30) {
    endTime.add(1, "days");
  }

  const timeRemaining = startTime.diff(endTime);

  let currentMs = utcTimeNow.format("X");
  let targetMs = endTime.format("X");
  let diffTime = parseInt(targetMs) - parseInt(currentMs);
  let duration = moment.duration(diffTime * 1000, "milliseconds");

  const hoursDiff = duration.hours();
  const minutesDiff = duration.minutes();
  const secondsDiff = duration.seconds();

  if (timeRemaining > -1) {
    hasRecentlyPassed = true;
  }
  if (hoursDiff < 1 && minutesDiff < 6 && minutesDiff >= 0) {
    isFiveMinutesRemaining = true;
  }
  if (hoursDiff < 1 && minutesDiff < 31 && minutesDiff >= 0) {
    isThirthyMinutesRemaing = true;
  }

  return {
    differenceToNextTime: startTime.to(endTime),
    hasRecentlyPassed,
    timeRemaining,
    hoursDiff,
    minutesDiff,
    secondsDiff,
    isFiveMinutesRemaining,
    isThirthyMinutesRemaing
  };
};

export const stripAddress = (address: string): string => {
  let firstAddress = address.slice(0, 8);
  let lastAddress = address.slice(-8);

  return `${firstAddress}...${lastAddress}`;
};
