import { loadVersionForPage } from '$lib/versions';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const pageNum = parseInt(params.page);
    if (Number.isNaN(pageNum)) {
        throw error(404, 'Unknown page');
    }

    const versions = loadVersionForPage(pageNum);
    
    return {
        page: pageNum,
        changelog: versions.versions,
        pages: versions.pages,
    };
};