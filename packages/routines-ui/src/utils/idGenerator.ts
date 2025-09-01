/**
 * Generate a unique ID for new entities
 * Uses a combination of timestamp and random number for uniqueness
 */
export function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
}
