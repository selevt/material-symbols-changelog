<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    {#if $page.data?.meta?.description}
        <meta name="description" content={$page.data.meta.description}>
    {:else}
        <meta name="description" content="Changelog for the Material Symbols icon library">
    {/if}
</svelte:head>

<main class="container">
    <a href='/'><h1>Material Symbols Changelog</h1></a>
    <slot></slot>
</main>
