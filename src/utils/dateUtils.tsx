import { formatDistanceToNow as formatDistanceToNowFn } from 'date-fns';

/**
 * Format a date to a human-readable string
 * @param date The date to format
 * @returns The formatted date string (e.g. "Apr 20, 2023")
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format the distance from now to the given date
 * @param date The date to compare to now
 * @returns The formatted string (e.g. "2 days ago")
 */
export const formatDistanceToNow = (date: Date): string => {
  return formatDistanceToNowFn(date, { addSuffix: true });
};