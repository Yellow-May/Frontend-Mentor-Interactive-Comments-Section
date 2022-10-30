<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import replyIcon from '../../assets/icon-reply.svg';
	import deleteIcon from '../../assets/icon-delete.svg';
	import editIcon from '../../assets/icon-edit.svg';
	import plusIcon from '../../assets/icon-plus.svg';
	import minusIcon from '../../assets/icon-minus.svg';

	export let icon: 'reply' | 'delete' | 'edit' | 'plus' | 'minus' = undefined;
	export let extraStyles: string = '';
	export let disabled: boolean = false;

	let type = $$props.type ?? 'button';
	let icons = new Map([
		['reply', replyIcon],
		['delete', deleteIcon],
		['edit', editIcon],
		['plus', plusIcon],
		['minus', minusIcon],
	]);
	let style = 'hover:opacity-50 ';

	if (icon) {
		style += `text-sm font-bold flex items-center gap-2 capitalize ${
			icon === 'delete' ? 'text-red-100' : 'text-blue-200'
		}`;
	} else {
		style += 'text-white text-base bg-blue-200 rounded py-2 px-5 uppercase';
	}

	if (disabled) {
		style += ' cursor-not-allowed';
	}

	style += ` ${extraStyles}`;
	const dispatch = createEventDispatcher();
</script>

<button {type} class={style} on:click={e => dispatch('on-click', e)} {disabled}>
	{#if icons.get(icon)}
		<img src={icons.get(icon)} alt="reply" class="max-w-full" />
		{#if icon !== 'plus' && icon !== 'minus'}
			{icon}
		{/if}
	{:else}
		<slot />
	{/if}
</button>
