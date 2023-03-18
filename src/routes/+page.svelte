<script>
    import IconBoxes from './IconSection.svelte';
    export let data;

    let f = new Intl.DateTimeFormat('hi');
    /**
     * @param date {timestamp}
     */
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];
    }
</script>

<!-- Hide layout until there is content -->
{#if data.changelog?.length}
    <h1>Material Symbols Changelog</h1>

    <p>
        This is an inofficial changelog for <a href="https://fonts.google.com/icons">Material Symbols</a>
        and not affiliated with Google or the Material Symbols project.
    </p>

    {#each data.changelog as version}
        <section>
            <h2 id='version-{version.date}'>{formatTimestamp(version.date)} <sup>v{version.version}</sup></h2>

            <IconBoxes title='Added' icons={version.added}></IconBoxes>
            <IconBoxes title='Removed' icons={version.removed}></IconBoxes>
            <IconBoxes title='Changed' icons={version.changed}></IconBoxes>
        </section>
    {/each}
{/if}
