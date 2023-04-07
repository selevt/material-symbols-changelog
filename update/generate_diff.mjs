import { resolve} from 'node:path'; 
import { doChunked, writeSortedJson } from './util.mjs';
import changelog from '../data/changelog.json' assert { type: 'json'};

/**
 * This is only for doing one-time updates when tweaking diffing
 */

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
await updateExisting();