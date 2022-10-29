<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let name: string;
	export let replyingTo: string;

	let style = `rounded-md border border-gray-100 cursor-pointer py-2 px-3 text-sm resize-none outline-none text-blue-300 font-normal ${$$props.class}`;

	const dispatch = createEventDispatcher();
</script>

<textarea
	{name}
	rows="3"
	on:input={e => dispatch('comment-input', e.currentTarget.value)}
	class={style}
	placeholder="Add a comment..."
	value={replyingTo}
/>
