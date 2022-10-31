<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './UI/Button.svelte';
	import Input from './UI/Input.svelte';
	import data from '../data/data.json';
	import type { CommentType } from 'src/data/types';
	const user = data.currentUser;

	let content = '';

	const dispatch = createEventDispatcher();
	const handleInput = (e: CustomEvent<any>) => (content = e.detail);
	const handleSubmit = (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		if (content) {
			if (type === 'New') {
				dispatch('add-comment', {
					id: Math.random() * 100,
					content: content.trim(),
					createdAt: '1 minute ago',
					score: 0,
					user,
					replies: [],
				} as CommentType);
			} else {
				if (content.startsWith('@')) {
					content = content.slice(1 + replyingTo.length).trim();
				}
				dispatch('add-reply', { content, user });
				reply = false;
			}

			content = '';
			e.currentTarget.reset();
		}
	};

	export let type: 'New' | 'Reply' = 'Reply';
	export let reply: boolean = true;
	export let replyingTo: string = '';
</script>

<form
	on:submit|preventDefault={handleSubmit}
	id="responseForm"
	class={`bg-white rounded-md p-4 md:p-5 flex items-start gap-2 md:gap-3 ${
		reply ? '' : 'hidden'
	}`}
>
	<img src={user.image.png} alt={user.username} class="w-7 md:w-9" />
	<Input
		name="new-comment"
		class="flex-grow"
		on:comment-input={handleInput}
		defaultValue={replyingTo}
	/>
	<Button type="submit">{type === 'Reply' ? type : 'Send'}</Button>
</form>
