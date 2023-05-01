import { error } from '@sveltejs/kit';
import changelog from '$lib/../../data/changelog.json'
import { buildDescription, filterSmallChanges } from '$lib/utils';

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
