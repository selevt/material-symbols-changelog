<script>
  import IconBoxes from "$lib/IconBoxes.svelte";
  import { formatTimestamp } from '$lib/utils';

  /** @type {import('$lib/types').Version[]} */
  export let versions;
</script>

{#each versions as version}
  <section>
    <h2 id="version-{version.date}">
      <a href="/version/{version.date}">{formatTimestamp(version.date)}</a>
    </h2>

    {#if "note" in version && version.note}<p>{version.note}</p>{/if}

    <IconBoxes title="Added" icons={version.added} />
    <IconBoxes title="Removed" icons={version.removed} />
    <IconBoxes title="Changed" icons={version.changed} />
  </section>
{/each}
