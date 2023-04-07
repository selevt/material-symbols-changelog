<script>
    import { formatTimestamp } from '$lib/utils';
    import IconBoxes from '$lib/IconBoxes.svelte';
    export let data;
</script>

<!-- Hide layout until there is content -->
{#if data.changelog?.length}
    <p>
        Unofficial changelog for <a href="https://fonts.google.com/icons">Material Symbols</a>,
        not affiliated with Google or the Material Symbols project. <a href='/about'>About this project</a>.
    </p>

    {#each data.changelog as version}
        <section>
            <h2 id='version-{version.date}'><a href='/version/{version.date}'>{formatTimestamp(version.date)}</a></h2>

            {#if 'note' in version && version.note}<p>{version.note}</p>{/if}

            <IconBoxes title='Added' icons={version.added}></IconBoxes>
            <IconBoxes title='Removed' icons={version.removed}></IconBoxes>
            <IconBoxes title='Changed' icons={version.changed}></IconBoxes>
        </section>
    {/each}
{/if}
