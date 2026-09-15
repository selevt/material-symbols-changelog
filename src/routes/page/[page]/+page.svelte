<script>
    import {} from '$app/stores'
    import Pagination from '$lib/Pagination.svelte';
  import VersionList from './VersionList.svelte';

    export let data;
</script>

<VersionList versions={data.changelog}></VersionList>

<Pagination page={data.page} pages={data.pages}></Pagination>