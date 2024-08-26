import { type ResolvedConfig } from 'vite';
export interface PatchConfig {
    patchKey: string;
    fileName: string;
}
export declare const envTypePatch: (config: PatchConfig) => {
    name: string;
    configResolved(resolvedConfig: ResolvedConfig): void;
};
