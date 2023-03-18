import { resolve } from 'node:path';
import { stat, writeFile, readFile } from 'node:fs/promises';

const targetDir = resolve(process.cwd(), 'data');
const lastIconsPath = resolve(targetDir, 'last.json');
const changelogPath = resolve(targetDir, 'changelog.json');

/**
 * @returns {Promise<{name: string}[]>}
 */
const fetchIcons = async () => {
    const resp = await fetch("https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,de;q=0.8",
            "Referer": "https://fonts.google.com/icons",
        },
        "body": null,
        "method": "GET"
    });
    const text = await resp.text();
    const result = JSON.parse(text.substring(5));
    const icons = result.icons;
    return icons.filter(icon => !icon.unsupported_families.includes("Material Symbols Outlined"));
};

/**
 * @param {string} icon 
 * @returns {Promise<string>} SVG content
 */
const fetchIcon = async (icon) => {
    const iconRes = await fetch(`https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/default/48px.svg`, {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.7,de;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site"
        },
        "referrer": "https://fonts.google.com/",
        "method": "GET",
        "mode": "cors"
    });
    return await iconRes.text()
};

const downloadIcon = async (icon, dlpath) => {
    const svg = await fetchIcon(icon);
    writeFile(dlpath, svg);
};

const doChunked = async (input, chunkSize, callback) => {
    let i = 0;
    const processing = [...input];
    while (processing.length) {
        const chunk = processing.splice(0, chunkSize);
        const tasks = [];

        for (const item of chunk) {
            tasks.push(callback(item));
            i++;
        }

        await Promise.all(tasks);
        console.log(`${i} / ${input.length}`);
    }
}

const icons = await fetchIcons();
const iconNames = icons.map(icon => icon.name);

console.log('got icon names', iconNames);

const res = {};
await doChunked(iconNames, 100, async (iconName) => {
    const svg = await fetchIcon(iconName);
    res[iconName] = svg;
})

// TODO: read previous last.json
// TODO: if it exists, do diff, detect new icons, removed icons, changed icons


const lastExists = await stat(lastIconsPath)
    .then(s => s.isFile)
    .catch(e => false);

if (lastExists) {
    const previousContent = await readFile(lastIconsPath, {encoding: 'utf-8'});
    const previousRes = JSON.parse(previousContent);

    console.log('comparing with previous icons');
    const previousIcons = previousRes.icons;
    const previousIconNames = Object.keys(previousIcons);

    const addedIcons = iconNames.filter(icon => !previousIconNames.includes(icon));
    const removedIcons = previousIconNames.filter(icon => !iconNames.includes(icon));

    const changedIcons = Object.entries(res).filter(([iconName, svg]) => {
        return !addedIcons.includes(iconName) &&
            !removedIcons.includes(iconName) &&
            svg !== previousIcons[iconName];
    }).map(entry => entry[0]);

    console.log("Changes:", {addedIcons, removedIcons, changedIcons});

    if (addedIcons.length || removedIcons.length || changedIcons.length) {
        const version = icons.reduce((v, icon) => icon.version > v ? icon.version : v, 0)
        let changelog = { versions: [] };

        const changelogExists = await stat(changelogPath)
            .then(s => s.isFile)
            .catch(e => false);
        if (changelogExists) {
            const changelogContent = await readFile(changelogPath, { encoding: 'utf-8' });
            changelog = JSON.parse(changelogContent);
        }

        changelog.versions.push({
            version,
            date: new Date().getTime(),
            added: addedIcons.map(name => ({
                name,
                icon: res[name],
            })),
            removed: removedIcons.map(name => ({
                name,
                icon: previousIcons[name],
            })),
            changed: changedIcons.map(name => ({
                name,
                before: previousIcons[name],
                after: res[name],
            }))
        });

        await writeFile(changelogPath, JSON.stringify(changelog), { encoding: 'utf-8' });

    }

}

const fileContent = {
    icons: res,
};
await writeFile(lastIconsPath, JSON.stringify(fileContent), {encoding: 'utf-8'});

/*
const targetDir = resolve(process.cwd(), 'last2');
let i = 0;
const BATCH_SIZE = 100;
const mutIcons = [...iconNames];
while (mutIcons.length) {
    const chunk = mutIcons.splice(0, BATCH_SIZE);
    const tasks = [];

    for (const iconName of chunk) {
        const iconPath = resolve(targetDir, iconName + '.svg')
        tasks.push(downloadIcon(iconName, iconPath));
        i++;
    }

    await Promise.all(tasks);
    console.log(`${i} / ${iconNames.length}`);
}
*/
