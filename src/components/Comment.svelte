<script lang="ts">
	import type { CommentType, ReplyType, UserType } from 'src/data/types';
	import { createEventDispatcher } from 'svelte';
	import Reply from './Reply.svelte';
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';
	import Confirm from './UI/Confirm.svelte';
	import Input from './UI/Input.svelte';
	import Vote from './UI/Vote.svelte';

	export let comment: CommentType;
	export let user: UserType;

	$: reply = false;
	$: edit = false;
	$: editedComment = '';
	$: confirmDelete = false;

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

	const updateComment = () => {
		dispatch('update-comment', { id: comment.id, content: editedComment });
		edit = false;
	};

	const updateReply = ({
		detail,
	}: {
		detail: { replyid: number; content: string };
	}) => {
		dispatch('update-reply', { id: comment.id, ...detail });
	};

	const confrimProps = {
		onCancel: () => (confirmDelete = false),
		onOk: () => {
			confirmDelete = true;
			deleteComment();
		},
	};
</script>

<div class="my-5 flex flex-col gap-3">
	<div
		class="bg-white p-4 md:p-5 flex flex-col-reverse md:flex-row gap-4 items-start rounded-md min-h-[130px] relative"
	>
		<Vote score={comment.score} on:update-score={updateScore} />

		<div class="flex-grow">
			<div class="flex justify-between items-center mb-3">
				<div class="flex items-center gap-3 text-sm text-blue-100 ">
					<img
						src={comment.user.image.png}
						alt={comment.user.username}
						class="w-6 md:w-7"
					/>

					<h5 class="font-bold text-sm md:text-base">
						{comment.user.username}

						{#if comment.user.username === user.username}
							&nbsp;
							<span class="bg-blue-200 p-1 text-white text-xs">you</span>
						{/if}
					</h5>

					<span class="text-xs md:text-sm">{comment.createdAt}</span>
				</div>

				<div
					class="absolute bottom-6 right-5 md:static flex items-center gap-5"
				>
					{#if comment.user.username === user.username}
						<Button icon="delete" on:on-click={() => (confirmDelete = true)} />
						<Button icon="edit" on:on-click={() => (edit = true)} />
					{:else}
						<Button icon="reply" on:on-click={() => (reply = !reply)} />
					{/if}
				</div>
			</div>

			{#if edit}
				<div class="flex flex-col items-end gap-2">
					<Input
						name="edit-comment"
						defaultValue={`${comment.content}`}
						on:comment-input={({ detail }) => (editedComment = detail)}
					/>
					<Button on:on-click={updateComment}>Update</Button>
				</div>
			{:else}
				<p class="text-xs md:text-sm text-blue-100 leading-[21px]">
					{comment.content}
				</p>
			{/if}
		</div>
	</div>

	{#if comment.replies.length > 0}
		<div
			class="relative w-[90%] ml-auto before:bg-gray-100 before:w-[2.5px] before:h-full before:absolute before:-left-[6.5%] md:before:-left-[5%] flex flex-col gap-3"
		>
			{#each comment.replies as reply}
				<Reply
					{reply}
					{user}
					on:update-reply-score={updateReplyScore}
					on:add-reply={addReply}
					on:delete-reply={deleteReply}
					on:update-reply={updateReply}
				/>
			{/each}
		</div>
	{/if}

	{#if confirmDelete}
		<Confirm {...confrimProps} />
	{/if}

	<Response
		{reply}
		replyingTo={`@${comment.user.username}`}
		on:add-reply={addReply}
	/>
</div>
