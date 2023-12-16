<script>
  import { _ } from "svelte-i18n"
</script>

<footer class="footer footer-center p-4 bg-base-100 text-teal-600 opacity-50 relative mt-auto mb-2.5">
  <div class="flex flex-col items-center justify-center space-y-1 md:flex-row md:space-x-2 md:space-y-0">
    <span class="ubuntu">MVG Finance © {new Date().getFullYear()}</span>
    <a href="#" class="" target="_blank"> {$_('media_kit')}</a>
    <a href="#" class="" > {$_('')}</a>
    <a href="#" class="" > {$_('')}</a>
    <a href="#" class="" > {$_('')}</a>
  </div>
</footer>