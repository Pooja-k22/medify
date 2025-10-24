import dayjs from "dayjs";

/**
 * Format date to MM-DD-YY
 * @param {string | Date | dayjs} date
 * @returns {string} formatted date
 */
export const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("MMM D, YYYY");
};



/**
 * Format start and end time
 * @param {string | Date} start - start time
 * @param {string | Date} end - end time
 * @returns {string} formatted as "hh:mm AM/PM - hh:mm AM/PM"
 */
export const formatTimeRange = (start, end) => {
  const formattedStart = start ? dayjs(start).format("hh:mm A") : "";
  const formattedEnd = end ? dayjs(end).format("hh:mm A") : "";
  return formattedStart && formattedEnd ? `${formattedStart} - ${formattedEnd}` : "";
};

/** 
 * Format date to YYYY-MM-DD format (date only, no time)
 * @param {string | Date | dayjs} date
 * @returns {string} formatted date as YYYY-MM-DD
 */

export const formatDateOnly = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};