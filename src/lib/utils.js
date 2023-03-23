/**
 * @param timestamp {number}
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}

/**
 * 
 * @param {{diff: {percentage: number}}[]} changed 
 */
export function filterSmallChanges(changed) {
    if (!changed) {
        return [];
    }
    return changed.filter(item => {
        return !item.diff || item.diff.percentage >= 0.5;
    });
}