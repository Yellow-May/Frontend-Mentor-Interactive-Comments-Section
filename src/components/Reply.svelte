<script lang="ts">
	import type { ReplyType, UserType } from 'src/data/types';
	import { createEventDispatcher } from 'svelte';
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';
	import Switch from './UI/Switch.svelte';

	$: isOpen = false;

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
</script>

<div class="flex flex-col gap-1">
	<div class="bg-white p-5 flex gap-4 items-start rounded-md min-h-[130px]">
		<Switch score={reply.score} on:update-score={updateScore} />

		<div class="flex-grow">
			<div class="flex justify-between items-center mb-3">
				<div class="flex items-center gap-3 text-sm text-blue-100 ">
					<img
						src={reply.user.image.png}
						alt={reply.user.username}
						class="w-7"
					/>
					<h5 class="font-bold">
						{reply.user.username}

						{#if reply.user.username === user.username}
							&nbsp;
							<span class="bg-blue-200 p-1 text-white text-xs">you</span>
						{/if}
					</h5>
					<span>{reply.createdAt}</span>
				</div>

				{#if reply.user.username === user.username}
					<div class="flex items-center gap-5">
						<Button
							variant="icon"
							icon="delete"
							on:on-click={() => dispatch('delete-reply', reply.id)}
						/>
						<Button variant="icon" icon="edit" />
					</div>
				{:else}
					<Button
						variant="icon"
						icon="reply"
						on:on-click={() => (isOpen = !isOpen)}
					/>
				{/if}
			</div>
			<p class="text-sm text-blue-100 leading-[21px]">
				<span class="text-blue-200 font-medium">@{reply.replyingTo}</span>&nbsp;
				{reply.content}
			</p>
		</div>
	</div>

	<Response
		reply={isOpen}
		replyingTo={`@${reply.user.username}`}
		on:add-reply={addReply}
	/>
</div>
