import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const mealEnum = pgEnum(
  "meal",
  [
    "breakfast",
    "lunch",
    "dinner",
    "snacks",
  ]
)

export const foodTable = pgTable(
  "food",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
    brand: varchar({ length: 255 }),
    calories: integer().notNull(),
    fats: integer().notNull(),
    fatsSaturated: integer().notNull().default(0),
    salt: integer().notNull().default(0),
    carbohydrates: integer().notNull(),
    fibers: integer().notNull().default(0),
    sugars: integer().notNull().default(0),
    proteins: integer().notNull(),
  },
  (self) => [
    index("name_idx").on(self.name)
  ]
)

export const servingTable = pgTable(
  "serving",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    meal: mealEnum().notNull(),
    quantity: integer().notNull(),
    foodId: integer("food_id")
      .references(() => foodTable.id)
      .notNull(),
    dailyLogDate: date("daily_log_date")
      .references(() => dailyLogTable.date)
      .notNull(),
  }
)

export const planTable = pgTable(
  "plan",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    calories: integer().notNull(),
    fatsRatio: integer().notNull(),
    carbohydratesRatio: integer().notNull(),
    proteinsRatio: integer().notNull(),
    isCurrent: boolean().notNull().default(false),
  }
)

export const dailyLogTable = pgTable(
  "daily_log",
  {
    date: date().primaryKey(),
    planId: integer("plan_id")
      .references(() => planTable.id)
      .notNull(),
  }
)

export const systemTable = pgTable(
  "system",
  {
    version: integer().notNull().default(0),
  }
)

