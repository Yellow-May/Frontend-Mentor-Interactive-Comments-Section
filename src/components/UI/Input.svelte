<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let name: string;
	export let defaultValue: string = undefined;

	let style = `w-full rounded-md border border-gray-100 cursor-pointer p-2 md:px-3 text-xs md:text-sm resize-none outline-none text-blue-300 font-normal ${$$props.class}`;

	const dispatch = createEventDispatcher();
</script>

<textarea
	{name}
	rows="4"
	on:input={e => dispatch('comment-input', e.currentTarget.value)}
	class={style}
	placeholder="Add a comment..."
	value={defaultValue}
/>
