/**
 * @param timestamp {number}
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}

/**
 * 
 * @param {import('./types').Version['changed']} changed 
 */
export function filterSmallChanges(changed) {
    if (!changed) {
        return [];
    }
    return changed.filter(item => {
        return !item.diff || item.diff.percentage >= 0.5;
    });
}

/**
 * @param {import('$lib/types').Version} version
 * @returns {string}
 */
export function buildDescription(version) {
    const changesSummary = buildChangesSummary(version);

    return `Material Symbols changes from ${formatTimestamp(version.date)}: ${changesSummary}`;
}

/**
 * @param {import('$lib/types').Version} version
 * @returns {string}
 */
function buildChangesSummary(version) {
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

    return parts.join(', ');
}