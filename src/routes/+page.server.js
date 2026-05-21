import { filterSmallChanges } from '$lib/utils';
import { loadVersionForPage } from '$lib/versions';
import changelog from '../../data/changelog.json';

export const prerender = true;
export const csr = false;

const LIMIT = 150;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const versions = loadVersionForPage(0);
    
    return {
        page: 0,
        changelog: versions.versions,
        pages: versions.pages,
    };
}