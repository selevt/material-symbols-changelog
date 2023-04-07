<script>
    import { formatTimestamp } from '$lib/utils';
    import IconBoxes from '$lib/IconBoxes.svelte';

    export let data;
    let version = data.changes;
    $: version: data.changes;
</script>

{#if version}
<h2 id='version-{version.date}'>
    {formatTimestamp(version.date)} <sup>v{version.version}</sup>
</h2>

{#if 'note' in version && version.note}<p>{version.note}</p>{/if}

<IconBoxes title='Added' icons={version.added}></IconBoxes>
<IconBoxes title='Removed' icons={version.removed}></IconBoxes>
<IconBoxes title='Changed' icons={version.changed}></IconBoxes>
{/if}