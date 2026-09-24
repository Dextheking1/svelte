<script>
	import { SvelteDate } from 'svelte/reactivity';

	let now = new SvelteDate(0);
	let items = $state([]);
	let n = 0;
</script>

<button onclick={() => now.setTime(1000 * ++n)}>tick</button>
<button onclick={() => {
	items.push({ id: n * 100 + items.length });
	if (items.length > 3) items = items.slice(-3);
}}>add</button>

{#each items as item (item.id)}
	<p>{now.getTime() / 1000}s</p>
{/each}
