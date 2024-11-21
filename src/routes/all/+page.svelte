<script>
  import {} from "$app/stores";
  import VersionList from "../page/[page]/VersionList.svelte";

  export let data;
</script>

<VersionList versions={data.changelog} />
