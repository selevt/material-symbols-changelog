<script>
  import Pagination from '$lib/Pagination.svelte';
  import VersionList from './page/[page]/VersionList.svelte';
  export let data;
</script>

<!-- Hide layout until there is content -->
{#if data.changelog?.length}
    <p>
        Unofficial changelog for <a href="https://fonts.google.com/icons">Material Symbols</a>,
        not affiliated with Google or the Material Symbols project. <a href='/about'>About this project</a>.
    </p>

    <VersionList versions={data.changelog}></VersionList>
{/if}

<Pagination page={0} pages={data.pages}></Pagination>