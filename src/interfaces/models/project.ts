import { Guitar } from './guitar';
import { Part } from './part';

/**
 * Represents a custom guitar build or assembly project composed of individual parts,
 * components, and specifications.
 */
export interface Project extends Guitar {
  readonly projectStart: string;
  readonly projectComplete?: string;
  /** Legacy body description or reference */
  readonly body?: string;
  /** Legacy neck description or reference */
  readonly neck?: string;
  /** Legacy pickguard description or reference */
  readonly pickguard?: string;
  /** Legacy list of components formatted as "Name; Price" */
  readonly components?: ReadonlyArray<string>;
  /** First-class array of structured Part objects comprising the project */
  readonly parts?: ReadonlyArray<Part>;
}
