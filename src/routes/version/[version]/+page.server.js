import { error } from '@sveltejs/kit';
import changelog from '$lib/../../data/changelog.json'
import { filterSmallChanges } from '$lib/utils';

export const prerender = true;
export const csr = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    /** @type {{date: number, added: any[], removed: [], changed: []}[]} */
    const versions = changelog.versions;
    const version = versions.find(v => `${v.date}` === params.version);
    if (!version) {
        throw error(404, 'Not found');
    }

    return {
        version: version.date,
        changes: {
            ...version,
            changed: filterSmallChanges(version.changed),
        },
    };
}