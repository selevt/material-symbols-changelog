import { resolve} from 'node:path'; 
import compareImages from 'resemblejs/compareImages.js';
import { doChunked, writeSortedJson } from './util.mjs';
import changelog from './data/changelog.json' assert { type: 'json'};

/**
 * 
 * @param {{before: string, after: string}} change 
 */
export async function diffVersion(change) {
    const beforeImg = `data:image/svg+xml;base64,${btoa(change.before)}`
    const afterImg = `data:image/svg+xml;base64,${btoa(change.after)}`
    const res = await compareImages(afterImg, beforeImg, {});

    const objRes = {
        percentage: res.rawMisMatchPercentage,
    };
    if (res.misMatchPercentage > 0.00) {
        objRes.img = res.getImageDataUrl();
    }
    return objRes;
}

async function updateExisting() {
    const start = new Date().getTime();

    for (const version of changelog.versions) {
        await doChunked(version.changed, 8, async (change) => {
            const res = await diffVersion(change);
            change.diff = res;
        });
        
    }
    console.log('took', new Date().getTime() - start);

    const targetDir = resolve(process.cwd(), 'data');
    const changelogPath = resolve(targetDir, 'changelog.json');
    await writeSortedJson(changelogPath, changelog);
}
// await updateExisting();