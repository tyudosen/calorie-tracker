import { Schema } from "effect";
import {
  FloatQuantityInsert,
  FloatQuantityInsertPositive,
  PrimaryKeyIndex,
} from "./shared";

/**
 * Schema for inserting a new meal plan.
 * @property calories - Daily calorie target (positive number)
 * @property fatsRatio - Target percentage of calories from fats
 * @property carbohydratesRatio - Target percentage of calories from carbohydrates
 * @property proteinsRatio - Target percentage of calories from proteins
 * 
 * Note: The WithValidation static property ensures that macronutrient ratios sum to 100%
 */
export class _PlanInsert extends Schema.Class<_PlanInsert>("_PlanInsert")({
  calories: FloatQuantityInsertPositive,
  fatsRatio: FloatQuantityInsert,
  carbohydratesRatio: FloatQuantityInsert,
  proteinsRatio: FloatQuantityInsert,
}) {
  static readonly WithValidation = this.pipe(
    Schema.filter((params) =>
      params.carbohydratesRatio + params.fatsRatio + params.proteinsRatio ===
        100
        ? true
        : "Macros ratio must be 100%"
    )
  );
}

/**
 * Schema for updating an existing meal plan.
 * @property id - Primary key of the plan to update
 * @property calories - New daily calorie target (positive number)
 * @property fatsRatio - New target percentage of calories from fats
 * @property carbohydratesRatio - New target percentage of calories from carbohydrates
 * @property proteinsRatio - New target percentage of calories from proteins
 * 
 * Note: The WithValidation static property ensures that macronutrient ratios sum to 100%
 */
export class _PlanUpdate extends Schema.Class<_PlanUpdate>("_PlanUpdate")({
  id: PrimaryKeyIndex,
  calories: FloatQuantityInsertPositive,
  fatsRatio: FloatQuantityInsert,
  carbohydratesRatio: FloatQuantityInsert,
  proteinsRatio: FloatQuantityInsert,
}) {
  static readonly WithValidation = this.pipe(
    Schema.filter((params) =>
      params.carbohydratesRatio + params.fatsRatio + params.proteinsRatio ===
        100
        ? true
        : "Macros ratio must be 100%"
    )
  );
}

/**
 * Schema for removing a meal plan.
 * @property id - Primary key of the plan to delete
 */
export class PlanRemove extends Schema.Class<PlanRemove>("PlanRemove")({
  id: PrimaryKeyIndex,
}) { }

/**
 * Schema for retrieving meal plans with their associated log counts.
 * @property id - Primary key of the plan
 * @property calories - Daily calorie target
 * @property fatsRatio - Target percentage of calories from fats
 * @property carbohydratesRatio - Target percentage of calories from carbohydrates
 * @property proteinsRatio - Target percentage of calories from proteins
 * @property isCurrent - Whether this is the currently active plan
 * @property logs - Number of daily logs associated with this plan
 */
export class PlanSelectWithLogs extends Schema.Class<PlanSelectWithLogs>(
  "PlanSelectWithLogs"
)({
  id: PrimaryKeyIndex,
  calories: FloatQuantityInsertPositive,
  fatsRatio: FloatQuantityInsert,
  carbohydratesRatio: FloatQuantityInsert,
  proteinsRatio: FloatQuantityInsert,
  isCurrent: Schema.Boolean,
  logs: Schema.NonNegative,
}) { }

/**
 * Schema for retrieving daily meal plan information.
 * @property id - Primary key of the plan
 * @property calories - Daily calorie target
 * @property fatsRatio - Target percentage of calories from fats
 * @property carbohydratesRatio - Target percentage of calories from carbohydrates
 * @property proteinsRatio - Target percentage of calories from proteins
 * @property isCurrent - Whether this is the currently active plan
 */
export class PlanSelectDaily extends Schema.Class<PlanSelectDaily>(
  "PlanSelectDaily"
)({
  id: PrimaryKeyIndex,
  calories: FloatQuantityInsertPositive,
  fatsRatio: FloatQuantityInsert,
  carbohydratesRatio: FloatQuantityInsert,
  proteinsRatio: FloatQuantityInsert,
  isCurrent: Schema.Boolean,
}) { }
