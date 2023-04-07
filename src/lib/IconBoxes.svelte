<script>
    /** @type {string} */
    export let title;

    /**
     * @typedef {import('$lib/types').Version} Version
     */
    /**
     * @type {Version['added'] | Version['removed'] | Version['changed']}
     */
    export let icons;
</script>

{#if icons?.length}
    <section class="icons_section">
        <h3>{title}</h3>
        <div class="icon_list">
            {#each icons as info}
                <div class='info_box'>
                    <div><code>{info.name}</code></div>
                    {#if 'icon' in info && info.icon}
                        <div>{@html info.icon}</div>
                    {:else if 'before' in info && info.before && info.after}
                        <div class='changed_icon'>
                            <div class='del'>{@html info.before}</div>
                            <div>&rarr;</div>
                            <div class='ins'>{@html info.after}</div>
                            {#if info.diff?.img}
                                <div aria-hidden="true" class='diffsep'></div>
                                <img alt='Diff visualization' src={info.diff.img}>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </section>
{/if}

<style>
    .icons_section {
        --block-spacing-vertical: calc(var(--spacing) * 1.5);
    }
    .icon_list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }
    .ins { color: var(--ins-color); }
    .del { color: var(--del-color); }
    .info_box {
        border: 1px solid #999;
        border-radius: 4px;
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

    .diffsep {
        width: 1px;
        height: 70%;
        background: #727272;
    }
</style>