export interface Entry {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly archive?: boolean;
}
