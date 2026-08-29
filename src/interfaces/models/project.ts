import { Guitar } from './guitar';
import { Part } from './part';

export interface Project extends Guitar {
  readonly projectStart: string;
  readonly projectComplete?: string;
  readonly body?: string;
  readonly neck?: string;
  readonly pickguard?: string;
  readonly components?: ReadonlyArray<string>;
  readonly parts?: ReadonlyArray<Part>;
}
