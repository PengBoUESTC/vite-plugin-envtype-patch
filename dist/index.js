'use strict';

var node_fs = require('node:fs');
var node_path = require('node:path');
var node_process = require('node:process');
var dtsGen = require('dts-gen');

const envTypePatch = (config) => {
    const { patchKey = 'ImportMetaEnv', fileName = 'env.d.ts' } = config || {};
    const targetPath = node_path.join(node_process.cwd(), fileName);
    return {
        name: 'vite-plugin-envtype-patch',
        configResolved(resolvedConfig) {
            const { env } = resolvedConfig;
            const envDts = dtsGen.generateIdentifierDeclarationFile(patchKey, env);
            node_fs.writeFile(targetPath, `/// <reference types="vite/client" /> \n interface ${patchKey} ${envDts.split(`${patchKey}:`)[1]}`, {
                flag: 'w+'
            }, (error) => {
                if (error) {
                    console.error(`${targetPath} write failed`, error);
                }
            });
        },
    };
};

exports.envTypePatch = envTypePatch;
