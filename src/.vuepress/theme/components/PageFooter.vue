<template>
  <footer v-if="enable" class="footer-wrapper">
    <MediaLinks v-if="!($frontmatter.home && $frontmatter.blog)" />
    <div class="footer-link">
    <a v-for="link in footerLinks" :href="link.link">{{link.text}}</a>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="footerContent" class="footer" v-html="footerContent" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="copyright" class="copyright" v-html="copyright" />
  </footer>
</template>

<script src="./PageFooter" />

<style lang="stylus">
.footer-wrapper
  display flex
  flex-wrap wrap
  justify-content space-evenly
  align-items center
  padding 12px 30px
  border-top 1px solid var(--border-color)
  background var(--bgcolor)
  color var(--dark-color, #666)
  text-align center

  @media (min-width $MQMobile)
    .has-sidebar &
      padding-left $sidebarWidth
      border-left 30px solid transparent

  & > div
    @media (max-width $MQMobileNarrow)
      width 100%

  .media-links-wrapper
    margin 0
  
  .footer-link
    clear both 
    width 100%
  
  .footer-link a
    font-size 12px
    color #4096EE
    margin-left 10px

  .footer-link a:before 
    content  ' [';
  .footer-link a:after 
    content  '] ';

  .footer
    margin 8px 16px
    font-size 10px

  .copyright
    margin 6px 0
    font-size 10px

.page:not(.not-found) + .footer-wrapper
  margin-top -2rem
</style>
