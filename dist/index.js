'use strict';

var node_fs = require('node:fs');
var node_path = require('node:path');
var node_process = require('node:process');

const toString = (ctx) => Object.prototype.toString.call(ctx);
const PrimitiveMap = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Undefined: 'undefined',
    Symbol: 'symbol',
    Null: 'null',
    BigInt: 'number',
};
const ReferenceType = {
    Array: 'Array',
    Object: 'object',
};
const DefaultType = 'any';
class TypeConvert {
    constructor(options = {}) {
        this.output = '';
        this.options = options;
    }
    toString() {
        const output = this.output;
        this.reset();
        return output;
    }
    print(s) {
        this.output = this.output + s;
        return this;
    }
    reset() {
        this.output = '';
        return this;
    }
    genSimpleType(value, level = 1) {
        const { fuzzyType = true } = this.options;
        const typeString = toString(value).slice(8, -1);
        const primitiveType = PrimitiveMap[typeString];
        if (primitiveType) {
            this.print(' ')
                .print(fuzzyType ? primitiveType : JSON.stringify(value))
                .print(',')
                .print('\n');
            return;
        }
        const referenceType = ReferenceType[typeString];
        if (!referenceType) {
            this.print(DefaultType)
                .print('\n');
            return;
        }
        if (referenceType === ReferenceType.Array) {
            this.print('[')
                .print('\n');
            value.forEach((v) => {
                this.print('\t'.repeat(level))
                    .genSimpleType(v, level + 1);
            });
            this.print('\t'.repeat(level - 1))
                .print(']')
                .print('\n');
            return;
        }
        if (referenceType === ReferenceType.Object) {
            this.print('{')
                .print('\n');
            Object.entries(value).forEach(([key, value]) => {
                this.print('\t'.repeat(level))
                    .print(key)
                    .print(':')
                    .genSimpleType(value, level + 1);
            });
            this.print('\t'.repeat(level - 1))
                .print('}')
                .print('\n');
        }
    }
}
const envTypePatch = (config) => {
    const { patchKey = 'ImportMetaEnv', fileName = 'env.d.ts', genOptions } = config || {};
    const targetPath = node_path.join(node_process.cwd(), fileName);
    return {
        name: 'vite-plugin-envtype-patch',
        apply: 'serve',
        configResolved(resolvedConfig) {
            const { env } = resolvedConfig;
            const typeConvert = new TypeConvert(genOptions);
            typeConvert.print(`/// <reference types="vite/client" /> \ninterface ${patchKey} `)
                .genSimpleType(env);
            node_fs.writeFile(targetPath, `${typeConvert}`, {
                flag: 'w+'
            }, (error) => {
                if (error) {
                    console.error(`${targetPath} write failed`, error);
                }
            });
        },
    };
};

exports.TypeConvert = TypeConvert;
exports.envTypePatch = envTypePatch;
