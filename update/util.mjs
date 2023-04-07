import { writeFile } from 'node:fs/promises';

/**
 * @param {ReadonlyArray<any>} input 
 * @param {number} chunkSize 
 * @param {(any) => Promise<any>} callback 
 * @param {boolean} log 
 */
export const doChunked = async (input, chunkSize, callback, log) => {
    let i = 0;
    const processing = [...input];
    while (processing.length) {
        const chunk = processing.splice(0, chunkSize);
        const tasks = [];

        for (const item of chunk) {
            tasks.push(callback(item));
            i++;
        }

        await Promise.all(tasks);
        if (log) {
            console.log(`${i} / ${input.length}`);
        }
    }
}

function sortObjByKey(value) {
    return (typeof value === 'object') ?
        (Array.isArray(value) ?
            value.map(sortObjByKey) :
            Object.keys(value).sort().reduce(
                (o, key) => {
                    const v = value[key];
                    o[key] = sortObjByKey(v);
                    return o;
                }, {})
        ) :
        value;
}

/**
 * 
 * @param {string} path 
 * @param {any} objectToSave 
 * @returns 
 */
export const writeSortedJson = async (path, objectToSave) => {
    return await writeFile(path, JSON.stringify(sortObjByKey(objectToSave), null, 2), { encoding: 'utf-8' });
}