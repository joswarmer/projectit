<script lang="ts">
    import type { GridBox, GridCell, PiEditor } from "@projectit/core";
    import { afterUpdate } from "svelte";
    import { AUTO_LOGGER, ChangeNotifier, UPDATE_LOGGER } from "./ChangeNotifier";
    import GridCellComponent from "./GridCellComponent.svelte";
    import { autorun } from "mobx";

    export let gridBox: GridBox;
    export let editor: PiEditor;

    // const className = classNames(this.props.box.style, styles.maingrid);

    let showgrid = gridBox;
    let notifier = new ChangeNotifier();
    afterUpdate(() => {
        UPDATE_LOGGER.log("ListComponent.afterUpdate")
        // Triggers autorun
        notifier.notifyChange();
    });

    let cells: GridCell[];
    let templateColumns: string;
    let templateRows: string;
    let broder = "red"

    autorun(() => {
        AUTO_LOGGER.log("AUTORUN GridComponent[" + notifier.dummy + "] ");
        showgrid = gridBox;
        cells = showgrid.cells;
        cells.forEach(cell => {
        });
        templateRows = `repeat(${showgrid.numberOfRows() - 1}, auto)`;
        templateColumns = `repeat(${showgrid.numberOfColumns() - 1}, auto)`;
    });
</script>
<div
        style=" grid-template-columns: {templateColumns};
                grid-template-rows: {templateRows};
                border: blue;

                border-style: dotted;
              "
        id={showgrid.id}
        class="maingridcomponent"
>
    {#each cells as cell (cell.box.id)}
        <GridCellComponent cell={cell} editor={editor}/>
    {/each}
</div>

<style>
    .maingridcomponent {
        display: inline-grid;
        grid-gap: 0px;
        align-items: center;
        align-content: center;
        justify-items: stretch;
        border: darkgreen;
        border-width: 1pt;
        border-style: solid;
    }
</style>
