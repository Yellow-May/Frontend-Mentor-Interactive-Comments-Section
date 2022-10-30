<script lang="ts">
	import Comment from './components/Comment.svelte';
	import Response from './components/Response.svelte';
	import data from './data/data.json';
	import type { CommentType, ReplyType } from './data/types';

	$: comments = data.comments;

	const updateScore = ({
		detail,
	}: {
		detail: { id: number; score: number };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.score = detail.score;
			}
			return comment;
		});
	};

	const updateReplyScore = ({
		detail,
	}: {
		detail: { id: number; replyid: number; score: number };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.replies = comment.replies.map(reply => {
					if (reply.id === detail.replyid) {
						reply.score = detail.score;
					}
					return reply;
				});
			}
			return comment;
		});
	};

	const addComment = ({ detail }: { detail: CommentType }) => {
		comments = [...comments, detail];
	};

	const addReply = ({
		detail,
	}: {
		detail: { id: number; reply: ReplyType };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.replies = [...comment.replies, detail.reply];
			}
			return comment;
		});
	};

	const deleteComment = ({ detail }: { detail: number }) => {
		comments = comments.filter(comment => comment.id !== detail);
	};

	const deleteReply = ({
		detail,
	}: {
		detail: { id: number; replyid: number };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.replies = comment.replies.filter(
					reply => reply.id !== detail.replyid
				);
			}
			return comment;
		});
	};

	const updateComment = ({
		detail,
	}: {
		detail: { id: number; content: string };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.content = detail.content;
			}
			return comment;
		});
	};

	const updateReply = ({
		detail,
	}: {
		detail: { id: number; replyid: number; content: string };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.replies = comment.replies.map(reply => {
					if (reply.id === detail.replyid) {
						reply.content = detail.content;
					}
					return reply;
				});
			}
			return comment;
		});
	};
</script>

<main class="font-rubik h-full w-full max-w-2xl mx-auto p-3">
	{#each comments as comment}
		<Comment
			{comment}
			user={data.currentUser}
			on:update-score={updateScore}
			on:update-reply-score={updateReplyScore}
			on:add-reply={addReply}
			on:delete-comment={deleteComment}
			on:delete-reply={deleteReply}
			on:update-comment={updateComment}
			on:update-reply={updateReply}
		/>
	{/each}

	<Response type="New" on:add-comment={addComment} />
</main>
