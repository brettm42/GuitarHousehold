import { ValidationFlag } from '../infrastructure/shared';

export interface Entry {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly archive?: boolean;
  validation?: ReadonlyArray<Map<string, ValidationFlag>>;
}
