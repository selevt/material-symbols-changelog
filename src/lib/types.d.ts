export interface Changelog {
    versions: Version[];
}

export interface Version {
    /** timestamp */
    date: number;
    version: number;
    added: {
        icon: string;
        name: string;
    }[];
    removed: {
        icon: string;
        name: string;
    }[];
    changed: {
        /** SVG content */
        before: string;
        /** SVG content */
        after: string;
        diff: {
            percentage: number;
            /** Base64 PNG */
            img?: string;
        }
        name: string;
    }[];
}