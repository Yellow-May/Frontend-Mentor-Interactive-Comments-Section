<script lang="ts">
	import type { CommentType, ReplyType, UserType } from 'src/data/types';
	import { createEventDispatcher } from 'svelte';
	import Reply from './Reply.svelte';
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';
	import Switch from './UI/Switch.svelte';

	export let comment: CommentType;
	export let user: UserType;

	$: reply = false;

	const dispatch = createEventDispatcher();
	const updateScore = ({ detail }: { detail: 'increment' | 'decrement' }) => {
		switch (detail) {
			case 'increment':
				dispatch('update-score', { id: comment.id, score: comment.score + 1 });
				break;

			case 'decrement':
				dispatch('update-score', { id: comment.id, score: comment.score - 1 });
				break;

			default:
				break;
		}
	};

	const updateReplyScore = ({
		detail,
	}: {
		detail: {
			id: number;
			score: number;
		};
	}) => {
		dispatch('update-reply-score', {
			id: comment.id,
			replyid: detail.id,
			score: detail.score,
		});
	};

	const addReply = ({
		detail,
	}: {
		detail: { content: string; user: UserType; replyingTo?: string };
	}) => {
		dispatch('add-reply', {
			id: comment.id,
			reply: {
				id: Math.random() * 100,
				createdAt: '1 minute ago',
				replyingTo: comment.user.username,
				score: 0,
				replies: [],
				...detail,
			} as ReplyType,
		});
	};

	const deleteComment = () => {
		dispatch('delete-comment', comment.id);
	};

	const deleteReply = ({ detail }: { detail: number }) => {
		dispatch('delete-reply', { id: comment.id, replyid: detail });
	};
</script>

<div class="my-5 flex flex-col gap-3">
	<div class="bg-white p-5 flex gap-4 items-start rounded-md min-h-[130px]">
		<Switch score={comment.score} on:update-score={updateScore} />

		<div class="flex-grow">
			<div class="flex justify-between items-center mb-3">
				<div class="flex items-center gap-3 text-sm text-blue-100 ">
					<img
						src={comment.user.image.png}
						alt={comment.user.username}
						class="w-7"
					/>
					<h5 class="font-bold">
						{comment.user.username}

						{#if comment.user.username === user.username}
							&nbsp;
							<span class="bg-blue-200 p-1 text-white text-xs">you</span>
						{/if}
					</h5>

					<span>{comment.createdAt}</span>
				</div>

				{#if comment.user.username === user.username}
					<div class="flex items-center gap-5">
						<Button variant="icon" icon="delete" on:on-click={deleteComment} />
						<Button variant="icon" icon="edit" />
					</div>
				{:else}
					<Button
						variant="icon"
						icon="reply"
						on:on-click={() => (reply = !reply)}
					/>
				{/if}
			</div>
			<p class="text-sm text-blue-100 leading-[21px]">{comment.content}</p>
		</div>
	</div>

	{#if comment.replies.length > 0}
		<div
			class="relative w-[90%] ml-auto before:bg-gray-100 before:w-[2.5px] before:h-full before:absolute before:-left-[5%] flex flex-col gap-3"
		>
			{#each comment.replies as reply}
				<Reply
					{reply}
					{user}
					on:update-reply-score={updateReplyScore}
					on:add-reply={addReply}
					on:delete-reply={deleteReply}
				/>
			{/each}
		</div>
	{/if}

	<Response
		{reply}
		replyingTo={`@${comment.user.username}`}
		on:add-reply={addReply}
	/>
</div>
