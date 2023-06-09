import { filterSmallChanges } from '$lib/utils';
import changelog from '../../data/changelog.json';

export const prerender = true;
export const csr = false;

const LIMIT = 150;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    
    /** @type {import('$lib/types').Changelog['versions']} */
    const versions = changelog.versions;
    const sortedVersions = versions.sort((a, b) => b.date - a.date)
    const filteredVersions = sortedVersions.map(version => {

        const changed = filterSmallChanges(version.changed);

        if (version.added.length > LIMIT || version.removed.length > LIMIT || changed.length > LIMIT) {
            return {
                ...version,
                added: [],
                removed: [],
                changed: [],
                note: `Detected a large number of changes in the version, they are not displayed. ${version.added.length} added, ${version.removed.length} removed, ${version.changed.length} changed.`,
            }
        } else {
            return {...version, changed};
        }
    }).filter(version => {
        return version.added.length || version.removed.length || version.changed.length || ('note' in version && version.note);
    });

    return {
        changelog: filteredVersions,
    };
}