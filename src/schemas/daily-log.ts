import { DateTime, Schema } from "effect";
import { PrimaryKeyIndex } from "./shared";

/**
 * Class representing a new daily log entry to be inserted into the database.
 * Records which meal plan was used on a specific date.
 * 
 * Fields:
 * - date: UTC date for the log entry
 * - planId: Reference to the meal plan used for this day
 */
export class DailyLogInsert extends Schema.Class<DailyLogInsert>(
  "DailyLogInsert"
)({
  date: Schema.DateTimeUtc,
  planId: PrimaryKeyIndex,
}) { }

/**
 * Class representing a daily log entry retrieved from the database.
 * Records which meal plan was used on a specific date.
 * 
 * Fields:
 * - date: UTC date for the log entry
 * - planId: Reference to the meal plan used for this day
 * 
 * Static Methods:
 * - formatDate: Formats a DateTime object into an ISO date string in UTC
 */
export class DailyLogSelect extends Schema.Class<DailyLogSelect>(
  "DailyLogSelect"
)({
  date: Schema.DateTimeUtc,
  planId: PrimaryKeyIndex,
}) {
  /**
   * Formats a DateTime object into an ISO date string in UTC timezone.
   * Example: 2024-01-01 for January 1st, 2024
   */
  static readonly formatDate = DateTime.formatIsoDateUtc;
}

/**
 * Class representing an update to a daily log entry in the database.
 * Used to change which meal plan was used on a specific date.
 * 
 * Fields:
 * - date: UTC date for the log entry (accepts ISO date string)
 * - planId: Reference to the new meal plan to use for this day
 * 
 * Note: Uses DateTimeUtcFromSelf to accept ISO date strings directly
 */
export class DailyLogUpdate extends Schema.Class<DailyLogUpdate>(
  "DailyLogUpdate"
)({
  date: Schema.DateTimeUtcFromSelf,
  planId: PrimaryKeyIndex,
}) { }
