import { type Plugin } from 'vite';
export interface PatchConfig {
    patchKey: string;
    fileName: string;
}
export declare const envTypePatch: (config?: Partial<PatchConfig>) => Plugin;
