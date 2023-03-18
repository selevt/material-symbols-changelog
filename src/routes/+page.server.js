import changelog from '../../data/changelog.json'

export const prerender = true;
export const csr = false;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    /** @type {any[]} */
    const versions = changelog.versions;
    const sortedVersions = versions.sort((a, b) => b.date - a.date)
    return {
        changelog: sortedVersions,
    };
}