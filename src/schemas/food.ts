import { Schema } from "effect";
import {
  EmptyStringAsUndefined,
  FloatQuantityInsert,
  FloatQuantityInsertPositive,
  FloatQuantityOrUndefined,
  PrimaryKeyIndex,
} from "./shared";

/**
 * Class representing a new food item to be inserted into the database.
 * All nutritional values are per 100g of the food.
 * 
 * Fields:
 * - name: Non-empty unique name of the food
 * - brand: Optional brand name (empty string is converted to undefined)
 * - calories: Energy content in calories (must be positive)
 * - carbohydrates: Carbohydrate content in grams
 * - proteins: Protein content in grams
 * - fats: Total fat content in grams
 * - fatsSaturated: Optional saturated fat content in grams
 * - salt: Optional salt content in grams
 * - fibers: Optional dietary fiber content in grams
 * - sugars: Optional sugar content in grams
 */
export class FoodInsert extends Schema.Class<FoodInsert>("FoodInsert")({
  name: Schema.NonEmptyString,
  brand: EmptyStringAsUndefined,
  calories: FloatQuantityInsertPositive,
  carbohydrates: FloatQuantityInsert,
  proteins: FloatQuantityInsert,
  fats: FloatQuantityInsert,
  fatsSaturated: FloatQuantityOrUndefined,
  salt: FloatQuantityOrUndefined,
  fibers: FloatQuantityOrUndefined,
  sugars: FloatQuantityOrUndefined,
}) { }

/**
 * Class representing an update to an existing food item in the database.
 * All nutritional values are per 100g of the food.
 * 
 * Fields:
 * - id: Primary key of the food item to update
 * - name: Non-empty unique name of the food
 * - brand: Optional brand name (empty string is converted to undefined)
 * - calories: Energy content in calories
 * - carbohydrates: Carbohydrate content in grams
 * - proteins: Protein content in grams
 * - fats: Total fat content in grams
 * - fatsSaturated: Optional saturated fat content in grams
 * - salt: Optional salt content in grams
 * - fibers: Optional dietary fiber content in grams
 * - sugars: Optional sugar content in grams
 */
export class FoodUpdate extends Schema.Class<FoodUpdate>("FoodUpdate")({
  id: PrimaryKeyIndex,
  name: Schema.NonEmptyString,
  brand: EmptyStringAsUndefined,
  calories: FloatQuantityInsert,
  carbohydrates: FloatQuantityInsert,
  proteins: FloatQuantityInsert,
  fats: FloatQuantityInsert,
  fatsSaturated: FloatQuantityOrUndefined,
  salt: FloatQuantityOrUndefined,
  fibers: FloatQuantityOrUndefined,
  sugars: FloatQuantityOrUndefined,
}) { }

/**
 * Class representing a food item retrieved from the database.
 * All nutritional values are per 100g of the food.
 * 
 * Fields:
 * - id: Primary key of the food item
 * - name: Non-empty unique name of the food
 * - brand: Optional brand name (null if not set)
 * - calories: Energy content in calories
 * - carbohydrates: Carbohydrate content in grams
 * - proteins: Protein content in grams
 * - fats: Total fat content in grams
 * - fatsSaturated: Optional saturated fat content in grams
 * - salt: Optional salt content in grams
 * - fibers: Optional dietary fiber content in grams
 * - sugars: Optional sugar content in grams
 * 
 * Note: Unlike FoodInsert/Update, brand uses NullOr instead of EmptyStringAsUndefined
 * for database compatibility.
 */
export class FoodSelect extends Schema.Class<FoodSelect>("FoodSelect")({
  id: PrimaryKeyIndex,
  name: Schema.NonEmptyString,
  brand: Schema.NullOr(Schema.NonEmptyString),
  calories: FloatQuantityInsert,
  carbohydrates: FloatQuantityInsert,
  proteins: FloatQuantityInsert,
  fats: FloatQuantityInsert,
  fatsSaturated: FloatQuantityOrUndefined,
  salt: FloatQuantityOrUndefined,
  fibers: FloatQuantityOrUndefined,
  sugars: FloatQuantityOrUndefined,
}) { }
