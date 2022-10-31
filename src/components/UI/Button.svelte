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
	export let variant: 'primary' | 'secondary' | 'danger' = 'primary';

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
		style += `text-xs md:text-sm font-bold flex items-center gap-1 md:gap-2 capitalize ${
			icon === 'delete' ? 'text-red-100' : 'text-blue-200'
		}`;
	} else {
		if (variant === 'secondary') {
			style += 'bg-blue-300 ';
		} else if (variant === 'danger') {
			style += 'bg-red-100 ';
		} else if (variant === 'primary') {
			style += 'bg-blue-200 ';
		}
		style +=
			'text-sm text-white md:text-base rounded py-2 px-3 md:px-5 uppercase';
	}

	if (disabled) {
		style += ' cursor-not-allowed';
	}

	style += ` ${extraStyles}`;
	const dispatch = createEventDispatcher();
</script>

<button
	{type}
	class={style}
	title={icon || 'btn'}
	on:click={e => dispatch('on-click', e)}
	{disabled}
>
	{#if icons.get(icon)}
		<img src={icons.get(icon)} alt="reply" class="max-w-full" />
		{#if icon !== 'plus' && icon !== 'minus'}
			{icon}
		{/if}
	{:else}
		<slot />
	{/if}
</button>
