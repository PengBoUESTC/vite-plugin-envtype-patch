import { type ResolvedConfig } from 'vite';
export interface PatchConfig {
    patchKey: string;
    fileName: string;
}
export declare const envTypePatch: (config?: Partial<PatchConfig>) => {
    name: string;
    configResolved(resolvedConfig: ResolvedConfig): void;
};
