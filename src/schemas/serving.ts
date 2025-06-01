import { Schema } from "effect";
import { FoodSelect } from "./food";
import { FloatQuantityInsertPositive, Meal, PrimaryKeyIndex } from "./shared";

/**
 * Schema for inserting a new serving record.
 * @property foodId - Reference to the food item
 * @property quantity - Amount in grams (positive number)
 * @property meal - Type of meal (breakfast/lunch/dinner/snacks)
 * @property dailyLogDate - UTC date when the serving was logged
 */
export class ServingInsert extends Schema.Class<ServingInsert>("ServingInsert")(
  {
    foodId: PrimaryKeyIndex,
    quantity: FloatQuantityInsertPositive,
    meal: Meal,
    dailyLogDate: Schema.DateTimeUtcFromSelf,
  }
) { }

/**
 * Schema for updating an existing serving record.
 * @property id - Primary key of the serving to update
 * @property quantity - New amount in grams (positive number)
 */
export class ServingUpdate extends Schema.Class<ServingUpdate>("ServingUpdate")(
  {
    id: PrimaryKeyIndex,
    quantity: FloatQuantityInsertPositive,
  }
) { }

/**
 * Schema for removing a serving record.
 * @property id - Primary key of the serving to delete
 */
export class ServingRemove extends Schema.Class<ServingRemove>("ServingRemove")(
  {
    id: PrimaryKeyIndex,
  }
) { }

/**
 * Schema for retrieving serving records with associated food details.
 * Combines serving data with food nutritional information.
 * @property id - Primary key of the serving
 * @property meal - Type of meal
 * @property quantity - Amount in grams
 * @property foodId - Reference to the food item
 * @property name - Name of the food
 * @property brand - Brand of the food (optional)
 * @property calories - Calories per 100g
 * @property fats - Fat content per 100g
 * @property carbohydrates - Carbohydrate content per 100g
 * @property proteins - Protein content per 100g
 */
export class ServingSelectWithFoods extends Schema.Class<ServingSelectWithFoods>(
  "ServingSelectWithFoods"
)({
  id: PrimaryKeyIndex,
  meal: Meal,
  quantity: FloatQuantityInsertPositive,
  foodId: FoodSelect.fields.id,
  name: FoodSelect.fields.name,
  brand: FoodSelect.fields.brand,
  calories: FoodSelect.fields.calories,
  fats: FoodSelect.fields.fats,
  carbohydrates: FoodSelect.fields.carbohydrates,
  proteins: FoodSelect.fields.proteins,
}) {
  /**
   * Calculates the total calories for an array of servings.
   * Formula: sum((calories per 100g * quantity) / 100) for each serving
   * @param _ Array of servings with food details
   * @returns Total calories consumed
   */
  static readonly totalCalories = (_: readonly ServingSelectWithFoods[]) =>
    _.reduce((acc, log) => acc + (log.calories / 100) * log.quantity, 0) ?? 0;

  /**
   * Calculates the total fats for an array of servings.
   * Formula: sum((fats per 100g * quantity) / 100) for each serving
   * @param _ Array of servings with food details
   * @returns Total fats consumed in grams
   */
  static readonly totalFats = (_: readonly ServingSelectWithFoods[]) =>
    _.reduce((acc, log) => acc + (log.fats / 100) * log.quantity, 0) ?? 0;

  /**
   * Calculates the total carbohydrates for an array of servings.
   * Formula: sum((carbohydrates per 100g * quantity) / 100) for each serving
   * @param _ Array of servings with food details
   * @returns Total carbohydrates consumed in grams
   */
  static readonly totalCarbohydrates = (_: readonly ServingSelectWithFoods[]) =>
    _.reduce((acc, log) => acc + (log.carbohydrates / 100) * log.quantity, 0) ??
    0;

  /**
   * Calculates the total proteins for an array of servings.
   * Formula: sum((proteins per 100g * quantity) / 100) for each serving
   * @param _ Array of servings with food details
   * @returns Total proteins consumed in grams
   */
  static readonly totalProteins = (_: readonly ServingSelectWithFoods[]) =>
    _.reduce((acc, log) => acc + (log.proteins / 100) * log.quantity, 0) ?? 0;
}
