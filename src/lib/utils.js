/**
 * @param timestamp {number}
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}