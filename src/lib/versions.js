import changelog from '../../data/changelog.json';
import { filterSmallChanges, formatTimestamp } from './utils';

const LIMIT = 150;
const PAGE_SIZE = 10;

/**
 * 
 * @param {number} page 
 * @returns {{
 *   versions: import('$lib/types').Version[];
 *   pages: string[];
 * }}
 */
export function loadVersionForPage(page) {
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

    // TODO: add caching - this data is the same for every page, no need to recompute
    /** @type {string[]} */
    const pages = [];
    for (let i=0; i<=Math.floor(filteredVersions.length / PAGE_SIZE); i++) {
        const pageData = dataForPage(filteredVersions, i);
        const firstDate = pageData.at(0)?.date;
        const lastDate = pageData.at(-1)?.date;
        if (firstDate !== undefined && lastDate !== undefined)
        pages.push(`${formatTimestamp(firstDate)} - ${formatTimestamp(lastDate)}`);
    }

    return {
        versions: dataForPage(filteredVersions, page),
        pages,
    };
}

/**
 * 
 * @param {import('$lib/types').Version[]} versions 
 * @param {number} page 
 */
function dataForPage(versions, page) {
    return versions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
}