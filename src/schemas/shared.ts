import { Number, Schema } from "effect"

/**
 * Schema for handling decimal quantities with one decimal place precision.
 * - Decode: Divides input by 10 and rounds to 1 decimal place (e.g., 125 -> 12.5)
 * - Encode: Multiplies input by 10 and rounds to 2 decimal places (e.g., 12.5 -> 125)
 * - Only accepts non-negative numbers
 */
export const FloatQuantityInsert = Schema.NonNegative.pipe(
  Schema.transform(Schema.NonNegative, {
    decode: (value) => Number.round(value / 10, 1),
    encode: (value) => Number.round(value * 10, 2),
  })
);

/**
 * Schema for handling optional decimal quantities with one decimal place precision.
 * - Accepts either undefined or non-negative numbers
 * - Decode: If defined, divides input by 10 (e.g., 125 -> 12.5)
 * - Encode: If defined, multiplies input by 10 (e.g., 12.5 -> 125)
 * - Preserves undefined values as-is
 */
export const FloatQuantityOrUndefined = Schema.UndefinedOr(
  Schema.NonNegative
).pipe(
  Schema.transform(Schema.UndefinedOr(FloatQuantityInsert), {
    decode: (value) => (value === undefined ? undefined : value / 10),
    encode: (value) => (value === undefined ? undefined : value * 10),
  })
);

/**
 * Schema for handling strictly positive decimal quantities.
 * - Extends FloatQuantityInsert with additional validation
 * - Ensures values are greater than or equal to 0
 * - Returns error message if validation fails
 */
export const FloatQuantityInsertPositive = FloatQuantityInsert.pipe(
  Schema.filter((value) =>
    value === undefined || value >= 0 ? true : "Quantity must be positive"
  )
);

/**
 * Schema for handling primary key indices in the database.
 * - Ensures values are non-negative integers
 * - Adds a branded type for type-safety
 */
export const PrimaryKeyIndex = Schema.NonNegative.pipe(
  Schema.brand("PrimaryKeyIndex")
);

/**
 * Schema for handling empty string to undefined conversions.
 * - Decode: Converts undefined to empty string
 * - Encode: Converts empty or whitespace-only strings to undefined
 * - Preserves non-empty strings as-is
 */
export const EmptyStringAsUndefined = Schema.UndefinedOr(Schema.String).pipe(
  Schema.transform(Schema.String, {
    decode: (value) => (value === undefined ? "" : value),
    encode: (value) => (value.trim().length === 0 ? undefined : value),
  })
);

/**
 * Schema defining valid meal types in the application.
 * - Restricts values to: "breakfast", "lunch", "dinner", "snacks"
 * - Uses literal types for type-safety and validation
 */
export const Meal = Schema.Literal("breakfast", "lunch", "dinner", "snacks");

