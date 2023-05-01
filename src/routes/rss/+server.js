/** @type {import('./$types').RequestHandler} */
import changelog from '$lib/../../data/changelog.json'
import { buildDescription, filterSmallChanges, formatTimestamp } from '$lib/utils';

export const prerender = true;

const LIMIT_ITEMS = 20;
const SKIP_START = 7;
const SKIP_END = 22;

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
    const versions = changelog.versions;
    const sortedVersions = versions.sort((a, b) => b.date - a.date)
    let filteredVersions = sortedVersions.map(version => {
        const changed = filterSmallChanges(version.changed);
        return { ...version, changed };
    }).filter(version => {
        return version.added.length || version.removed.length || version.changed.length;
    });

    if (filteredVersions.length > LIMIT_ITEMS) {
        filteredVersions = filteredVersions.slice(0, LIMIT_ITEMS);
    }

    const APP_PATH = 'https://' + (process.env.PUBLIC_URL ?? process.env.VERCEL_URL ?? 'material-symbols-changelog.vercel.app');
    const RSS_PATH = APP_PATH + '/rss';

    /** @type {number[]} */
    const skipHours = [];
    for (let i=SKIP_START; i<=SKIP_END; i++) {
        skipHours.push(i);
    }

    e.setHeaders({
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml",
    });
    return new Response(
      `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>Material Symbols Changelog</title>
    <description>Latest changes of the Material Symbols icon library</description>
    <link>${APP_PATH}</link>
    <atom:link href="${RSS_PATH}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <skipHours>${skipHours.map(i => `<hour>${i}</hour>`).join('')}</skipHours>
${filteredVersions.map(v => (
`        <item>
        <title>Changes from ${formatTimestamp(v.date)}</title>
        <link>${APP_PATH}/version/${v.date}</link>
        <guid>${APP_PATH}/version/${v.date}</guid>
        <description>${buildDescription(v)}</description>
        <pubDate>${new Date(v.date).toUTCString()}</pubDate>
    </item>`)
).join('\n')}
    </channel>
</rss>
    `.trim()
    );
}
