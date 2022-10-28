<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	export let score: number;
	let picked: 'up' | 'down' | undefined;

	const dispatch = createEventDispatcher();
	const increment = () => {
		if (picked !== 'up') {
			dispatch('update-score', 'increment');
			picked = 'up';
		}
	};
	const decrement = () => {
		if (picked !== 'down') {
			dispatch('update-score', 'decrement');
			picked = 'down';
		}
	};
</script>

<div
	class="w-[4.25rem] h-[4.25rem] rounded-md flex flex-col items-center justify-center bg-gray-50"
>
	<Button
		icon="plus"
		extraStyles="p-2"
		on:on-click={increment}
		disabled={picked === 'up'}
	/>
	<span class="text-xs flex-grow flex items-center text-blue-200 font-medium"
		>{score}
	</span>
	<Button
		icon="minus"
		extraStyles="ml-[2px] p-2"
		on:on-click={decrement}
		disabled={picked === 'down'}
	/>
</div>
