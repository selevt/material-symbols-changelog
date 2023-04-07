import { error } from '@sveltejs/kit';
import changelog from '$lib/../../data/changelog.json'
import { filterSmallChanges, formatTimestamp } from '$lib/utils';

export const prerender = true;
export const csr = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    /** @type {import('$lib/types').Changelog['versions']} */
    const versions = changelog.versions;
    const version = versions.find(v => `${v.date}` === params.version);
    if (!version) {
        throw error(404, 'Not found');
    }

    const filteredVersion = {
        ...version,
        changed: filterSmallChanges(version.changed),
    };
    return {
        version: version.date,
        changes: filteredVersion,
        meta: {
            description: buildDescription(filteredVersion),
        },
    };
}

/**
 * @param {import('$lib/types').Version} version
 * @returns {string}
 */
function buildDescription(version) {
    /** @type {string[]} */
    const parts = []
    if (version.added.length > 0) {
        parts.push(`${version.added.length} added`)
    }
    if (version.changed.length > 0) {
        parts.push(`${version.changed.length} changed`)
    }
    if (version.removed.length > 0) {
        parts.push(`${version.removed.length} removed`)
    }

    return `Material Symbols changes from ${formatTimestamp(version.date)}: ${parts.join(', ')}`;
}