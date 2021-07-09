<svelte:window on:scroll|passive={onScroll} on:resize|passive={onResize} />

<svelte:head>
	<title>ProjectIt Test3</title>
</svelte:head>

<main>
			<MainGrid/>

</main>

<Footer />

<script>
	import {onMount, tick} from 'svelte';

	import {Icon} from 'svelte-mui';

	import {arrowForward} from './assets/icons';
	import AppBar from './side-elements/AppBar.svelte';
	import LeftPanel from './side-elements/LeftPanel.svelte';
	import RightPanel from './side-elements/RightPanel.svelte';
	import LoginDialog from './side-elements/LoginDialog.svelte';
	import Footer from "./side-elements/Footer.svelte";
	import MainGrid from "./main/MainGrid.svelte";
	import {EditorCommunication} from "./editor/EditorCommunication";

	const MAX_WIDTH = 720;
	let width = MAX_WIDTH;
	let offsetTop = 0;
	let leftPanelVisible = false;
	let rightPanelVisible = false;
	let loginDialogVisible = false;
	let username = '';
	let password = '';

	EditorCommunication.initialize();

	onMount(async () => {
		onResize();
	});

	function onKeyDown(e) {
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.stopPropagation();
			e.preventDefault();

			leftPanelVisible = true;
		}
	}

	async function onResize() {
		width =
				window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if (width > MAX_WIDTH) {
			leftPanelVisible = false;

			await tick();
			let node = document.getElementsByClassName('nav-panel')[0];
			try {
				const rc = node.getClientRects()[0];
				const h =
						window.innerHeight ||
						document.documentElement.clientHeight ||
						document.body.clientHeight;
				const maxHeight = h - rc.top - 24;

				node.style.maxHeight = maxHeight + 'px';
			} catch (err) {
			} // eslint-disable-line
		}
	}

	function onScroll() {
		offsetTop = window.pageYOffset || document.documentElement.scrollTop;
	}
</script>


<style>
	main {
		margin: var(--pi-header-height) auto 0;
		min-width: 256px;
		/*max-width: 1600px;*/
		padding: 1rem;
	}
</style>
