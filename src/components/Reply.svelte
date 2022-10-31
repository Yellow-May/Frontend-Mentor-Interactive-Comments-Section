<script lang="ts">
	import type { ReplyType, UserType } from 'src/data/types';
	import { createEventDispatcher } from 'svelte';
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';
	import Input from './UI/Input.svelte';
	import Switch from './UI/Switch.svelte';

	$: isOpen = false;
	$: edit = false;
	$: editedReply = reply.content;

	export let reply: ReplyType;
	export let user: UserType;

	const dispatch = createEventDispatcher();
	const updateScore = ({ detail }: { detail: 'increment' | 'decrement' }) => {
		switch (detail) {
			case 'increment':
				dispatch('update-reply-score', {
					id: reply.id,
					score: reply.score + 1,
				});
				break;

			case 'decrement':
				dispatch('update-reply-score', {
					id: reply.id,
					score: reply.score - 1,
				});
				break;

			default:
				break;
		}
	};

	const addReply = ({
		detail,
	}: {
		detail: { content: string; user: UserType };
	}) => {
		dispatch('add-reply', {
			replyingTo: reply.user.username,
			...detail,
		});
	};

	const updateReply = () => {
		if (editedReply.startsWith('@')) {
			editedReply = editedReply.slice(1 + reply.replyingTo.length).trim();
		}
		dispatch('update-reply', { replyid: reply.id, content: editedReply });
		edit = false;
	};
</script>

<div class="flex flex-col gap-1">
	<div
		class="bg-white p-4 md:p-5 flex flex-col-reverse md:flex-row gap-4 items-start rounded-md min-h-[130px] relative"
	>
		<Switch score={reply.score} on:update-score={updateScore} />

		<div class="flex-grow w-full">
			<div class="flex justify-between items-center mb-3">
				<div class="flex items-center gap-3 text-sm text-blue-100 ">
					<img
						src={reply.user.image.png}
						alt={reply.user.username}
						class="w-6 md:w-7"
					/>

					<h5 class="font-bold text-sm md:text-base">
						{reply.user.username}

						{#if reply.user.username === user.username}
							&nbsp;
							<span class="bg-blue-200 p-1 text-white text-[0.65rem] md:text-xs"
								>you</span
							>
						{/if}
					</h5>

					<span class="text-xs md:text-sm">{reply.createdAt}</span>
				</div>

				<div
					class="absolute bottom-6 right-5 md:static flex items-center gap-5"
				>
					{#if reply.user.username === user.username}
						<Button
							variant="icon"
							icon="delete"
							on:on-click={() => dispatch('delete-reply', reply.id)}
						/>
						<Button
							variant="icon"
							icon="edit"
							on:on-click={() => (edit = true)}
						/>
					{:else}
						<Button
							variant="icon"
							icon="reply"
							on:on-click={() => (isOpen = !isOpen)}
						/>
					{/if}
				</div>
			</div>

			{#if edit}
				<div class="flex flex-col items-end gap-2">
					<Input
						name="edit-reply"
						defaultValue={`@${reply.replyingTo} ${reply.content}`}
						on:comment-input={({ detail }) => (editedReply = detail)}
					/>
					<Button on:on-click={updateReply}>Update</Button>
				</div>
			{:else}
				<p class="text-xs md:text-sm text-blue-100 leading-[21px]">
					<span class="text-blue-200 font-medium">@{reply.replyingTo}</span
					>&nbsp;
					{reply.content}
				</p>
			{/if}
		</div>
	</div>

	<Response
		reply={isOpen}
		replyingTo={`@${reply.user.username}`}
		on:add-reply={addReply}
	/>
</div>
