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