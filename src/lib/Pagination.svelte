<script>
    /** @type {number} current page idx */
    export let page;

    /** @type {string[]} page labels - array index is page index */
    export let pages = [];

    $: prevHref = hrefForPage(page - 1);
    $: nextHref = hrefForPage(page + 1);

    /**
     * @param targetPage {number}
     * @returns {string | undefined}
     */
    function hrefForPage(targetPage) {
        if (targetPage < 0 || targetPage >= pages.length || targetPage === page) {
            return undefined;
        }
        if (targetPage === 0) {
            return '/'
        }
        return `/page/${targetPage}`;
    }
</script>

<div class='pagination'>
    <a aria-label='Previous page' href={prevHref} class='outline' role='button'>&lt;</a>
    <a aria-label='Next page' href={nextHref} class='outline' role='button'>&gt;</a>

  
    <details role="list">
        <summary aria-haspopup="listbox">Page {page + 1}</summary>
        <ul class='selectlist' role="listbox">
            {#each pages as pageOpt, idx}
                <li><a href={hrefForPage(idx)}>Page {idx + 1} - {pageOpt}</a></li>
            {/each}
        </ul>
    </details>

    <a href='/all' class='showAllLink secondary'>Show all</a>
</div>

<style>
    .pagination {
        display: flex;
        align-items: start;
        gap: 8px;
    }
    .selectlist {
        width: fit-content;
    }
    .showAllLink {
        padding: var(--form-element-spacing-vertical) 0;
    }
</style>