'use strict';

var node_fs = require('node:fs');
var node_url = require('node:url');
var node_path = require('node:path');
var dtsGen = require('dts-gen');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const envTypePatch = (config) => {
    const { patchKey = 'ImportMetaEnv', fileName = 'env.d.ts' } = config;
    const base = node_path.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))));
    const targetPath = node_path.join(base, fileName);
    return {
        name: 'meta-type-patch',
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
