import { Guitar } from './guitar';

export interface Project extends Guitar {
    readonly projectStart?: string;
    readonly projectComplete?: string;
    readonly body?: string;
    readonly neck?: string;
    readonly pickguard?: string;
}
