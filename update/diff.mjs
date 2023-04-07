import compareImages from 'resemblejs/compareImages.js';

/**
 * 
 * @param {{before: string, after: string}} change 
 */
export async function diffVersion(change) {
    const beforeImg = `data:image/svg+xml;base64,${btoa(change.before)}`
    const afterImg = `data:image/svg+xml;base64,${btoa(change.after)}`
    const res = await compareImages(afterImg, beforeImg, {});

    const objRes = {
        percentage: res.rawMisMatchPercentage,
    };
    if (res.rawMisMatchPercentage > 0.00) {
        objRes.img = res.getImageDataUrl();
    }
    return objRes;
}
