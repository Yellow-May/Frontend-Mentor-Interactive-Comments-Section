<script lang="ts">
	let type = $$props.type ?? 'button';
</script>

<button
	{type}
	class="py-2 px-5 text-white text-base bg-blue-200 uppercase rounded hover:bg-blue-50"
>
	<slot />
</button>
