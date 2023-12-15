<script>
  import { _ } from "svelte-i18n"
</script>

<footer class="footer footer-center p-4 bg-base-100 text-teal-600 opacity-50 relative mt-auto mb-2.5">
  <div class="flex space-x-2">
    <span class="ubuntu">MVG Finance © {new Date().getFullYear()}</span>
    <a href="#" class="" target="_blank"> {$_('media_kit')}</a>
    <a href="#" class="" > {$_('')}</a>
    <a href="#" class="" > {$_('')}</a>
    <a href="#" class="" > {$_('')}</a>
  </div>
</footer>