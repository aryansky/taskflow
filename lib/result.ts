export type Result<T, E extends string = string> =
  | { success: true; data: T }
  | { success: false; error: { type: E } };
