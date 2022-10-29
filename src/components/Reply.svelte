<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';
	import Switch from './UI/Switch.svelte';

	$: isOpen = false;

	export let reply: {
		id: number;
		content: string;
		createdAt: string;
		score: number;
		replyingTo: string;
		user: {
			image: {
				png: string;
				webp: string;
			};
			username: string;
		};
	};

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
</script>

<div class="flex flex-col gap-1">
	<div class="bg-white p-5 flex gap-4 items-start rounded-md">
		<Switch score={reply.score} on:update-score={updateScore} />

		<div>
			<div class="flex justify-between items-center mb-3">
				<div class="flex items-center gap-3 text-sm text-blue-100 ">
					<img
						src={reply.user.image.png}
						alt={reply.user.username}
						class="w-7"
					/>
					<h5 class="font-bold">
						{reply.user.username}
					</h5>
					<span>{reply.createdAt}</span>
				</div>
				<Button
					variant="icon"
					icon="reply"
					on:on-click={() => (isOpen = !isOpen)}
				/>
			</div>
			<p class="text-sm text-blue-100 leading-[21px]">
				<span class="text-blue-200 font-medium">@{reply.replyingTo}</span>&nbsp;
				{reply.content}
			</p>
		</div>
	</div>

	<Response reply={isOpen} />
</div>