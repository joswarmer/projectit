<!-- this component shows message to the user -->
<!-- the content, severity, and whether or not the message is shown is triggered by the elements in WebappStore -->

<Snackbar bind:visible bg={bgs[colorpicker]} {timeout}>
    {get(errorMessage)}
    <span slot="action">
        <Button color={btcolors[colorpicker]} on:click={() => {visible=false}}>Close</Button>
    </span>
</Snackbar>

<script lang="ts">
    import { Snackbar, Button } from 'svelte-mui';
    import {showError, errorMessage, severity} from "../menu-ts-files/WebappStore.ts";
    import {get} from "svelte/store";

    let visible: boolean;
    showError.subscribe(() => {visible = get(showError)});

    // background and font color are determined based on severity of the message
    let colorpicker: number;
    severity.subscribe(() => {colorpicker = get(severity)});
    // background color depending on severity type
    // order is: info, hint, warning, error, see WebappStore.ts
    let bgs = ['#d9d9d9', '#d9d9d9', '#ffff80', "#ff4d4d"];
    // text color depending on severity type
    let btcolors = ['#f50057', '#ff0', '#ff0', '#ff0'];

    // the following code is needed to adjust 'showError' when the timeout fires
    $: if (visible == false) {
        showError.set(false);
    }
    let timeout: number = 5;
</script>

