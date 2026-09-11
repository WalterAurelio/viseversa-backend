export const conditions = ["nuevo", "muy_bueno", "bueno"] as const;

export type Condition = (typeof conditions)[number];
