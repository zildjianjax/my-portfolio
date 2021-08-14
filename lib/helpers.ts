import _ from "lodash";
import moment from "moment";
import { Plant } from "./interface";

type ReturnDate = {
  differenceToNextTime: Date | string;
  hasRecentlyPassed: boolean;
  timeRemaining: number | string;
  hoursDiff: number;
  minutesDiff: number;
  secondsDiff: number;
  isFiveMinutesRemaining: boolean;
  isThirthyMinutesRemaing: boolean;
  moveToNextDay: boolean;
};

export const getTimeDiff = (
  time: Date | string,
  isLocked: boolean = false,
  crow: boolean = false,
  crowHours: number = 2
): ReturnDate => {
  const utcTimeNow = moment.utc();
  let timeToMoment = moment(time);

  if (!timeToMoment.isValid()) {
    return {
      differenceToNextTime: "N/A",
      hasRecentlyPassed: false,
      isFiveMinutesRemaining: false,
      isThirthyMinutesRemaing: false,
      moveToNextDay: false,
      timeRemaining: 0,
      hoursDiff: 0,
      minutesDiff: 0,
      secondsDiff: 0,
    };
  }

  let timeToHours = timeToMoment.utc().format("HH:mm:ss");

  const startTime = moment.utc(utcTimeNow.format("HH:mm:ss"), "HH:mm a");
  const endTime = moment.utc(timeToHours, "HH:mm:ss a");

  const hourDiff = startTime.diff(endTime, "hours");
  const minuteDiff = startTime.diff(endTime, "minutes");

  let hasRecentlyPassed = false;
  let moveToNextDay = false;
  let isFiveMinutesRemaining = false;
  let isThirthyMinutesRemaing = false;

  if (!crow) {
    if (startTime.isAfter(endTime) && hourDiff >= 0 && minuteDiff >= 1) {
      if (!(isLocked && minuteDiff < 3)) {
        endTime.add(1, "days");
        moveToNextDay = true;
      }
    }
  } else {
    if (startTime.isAfter(endTime) && (hourDiff >= crowHours && hourDiff <= crowHours + 1) && minuteDiff >= 1) {
      if (!(isLocked && minuteDiff < 3)) {
        endTime.add(1, "days");
        moveToNextDay = true;
      }
    }
  }

  const timeRemaining = startTime.diff(endTime);

  let currentMs = utcTimeNow.unix();
  let targetMs = endTime.unix();
  let diffTime = targetMs - currentMs;
  let duration = moment.duration(diffTime * 1000, "milliseconds");

  // console.log(duration.humanize());

  const hoursDiff = duration.hours();
  const minutesDiff = duration.minutes();
  const secondsDiff = duration.seconds();

  if (duration.as("milliseconds") < 0) {
    hasRecentlyPassed = true;
  }
  if (hoursDiff < 1 && minutesDiff < 2 && minutesDiff >= 0) {
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
    isThirthyMinutesRemaing,
    moveToNextDay,
  };
};

export const stripAddress = (address: string): string => {
  let firstAddress = address.slice(0, 8);
  let lastAddress = address.slice(-8);

  return `${firstAddress}...${lastAddress}`;
};

export const counterText = (number: number): string => {
  return _.trim(number.toString()).length == 1
    ? "0" + number
    : number.toString();
};

export const plantCountdownHtml = (plant: Plant) => {
  let hours: string;
  let minutes: string;
  let seconds: string;
  if (plant.hasRecentlyPassed) {
    hours = counterText(-plant?.hoursDiff);
    minutes = counterText(-plant?.minutesDiff);
    seconds = counterText(-plant?.secondsDiff);
  } else {
    hours = counterText(plant?.hoursDiff);
    minutes = counterText(plant?.minutesDiff);
    seconds = counterText(plant?.secondsDiff);
  }
  return `${hours}:${minutes}:${seconds}`;
};
