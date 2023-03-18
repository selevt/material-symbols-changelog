<script>
    export let data;
</script>

<h1>Material Symbols Changelog</h1>

<p>
    This is an inofficial changelog for <a href="https://fonts.google.com/icons">Material Symbols</a>
    and not affiliated with Google or the Material Symbols project.
</p>

{#each data.changelog as version}
    <div class="version_block">
        <h2 id='version-{version.date}'>{new Date(version.date).toLocaleDateString()} | v{version.version}</h2>

        {#if version.added?.length}
            <div>Added icons</div>
            <div class="icon_list">
                {#each version.added as info}
                    <div class='info_box'>
                        <div>{info.name}</div>
                        <div>{@html info.icon}</div>
                    </div>
                {/each}
            </div>
        {/if}
        {#if version.removed?.length}
            <div>Removed icons</div>
            <div class="icon_list">
                {#each version.removed as info}
                    <div class='info_box'>
                        <div>{info.name}</div>
                        <div>{@html info.icon}</div>
                    </div>
                {/each}
            </div>
        {/if}
        {#if version.changed?.length}
            <div>Changed icons</div>
            <div class="icon_list">
                {#each version.changed as info}
                    <div class='info_box'>
                        <div>{info.name}</div>
                        <div class='changed_icon'>
                            <div>{@html info.before}</div>
                            <div>&rarr;</div>
                            <div>{@html info.after}</div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/each}

<style>
    .version_block {
        margin-bottom: 1rem;
    }

    .icon_list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }

    .info_box {
        border: 1px solid #999;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .changed_icon {
        display: flex;
        align-items: center;
        gap: 16px;
    }
</style>