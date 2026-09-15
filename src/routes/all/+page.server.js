import { loadVersions } from '$lib/versions';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const versions = loadVersions();
    
    return {
        changelog: versions,
    };
};