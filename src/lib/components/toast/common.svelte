<script lang="ts">
	export let message: string;
</script>

<div class="inline-block font-semibold break-words leading-10">{message.length <= 100 ? message : `${message.substring(0, 200)}...`}</div>