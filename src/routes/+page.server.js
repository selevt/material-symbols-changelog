import changelog from '../../data/changelog.json'

export const prerender = true;
export const csr = false;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        changelog: changelog.versions,
    };
}