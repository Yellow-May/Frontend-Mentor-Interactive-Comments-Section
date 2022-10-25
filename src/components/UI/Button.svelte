<script lang="ts">
	import replyIcon from '../../assets/icon-reply.svg';
	import deleteIcon from '../../assets/icon-delete.svg';
	import editIcon from '../../assets/icon-edit.svg';

	export let icon: 'reply' | 'delete' | 'edit' = 'reply';

	let type = $$props.type ?? 'button';
	let icons = new Map([
		['reply', replyIcon],
		['delete', deleteIcon],
		['edit', editIcon],
	]);
	let style = 'hover:opacity-50 ';

	if (type === 'submit') {
		style += 'text-white text-base bg-blue-200 rounded py-2 px-5 uppercase';
	} else {
		style += `text-sm font-bold flex items-center gap-2 capitalize ${
			icon === 'delete' ? 'text-red-100' : 'text-blue-200'
		}`;
	}
</script>

<button {type} class={style}>
	{#if type === 'button'}
		<img src={icons.get(icon)} alt="reply" />
		{icon}
	{:else}
		<slot />
	{/if}
</button>
