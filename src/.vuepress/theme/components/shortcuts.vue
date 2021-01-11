<template>
  <main
    :aria-labelledby="$frontmatter.heroText !== null ? 'main-title' : null"
    class="home"
  >
    <header class="hero">
      <MyTransition>
        <img
          v-if="$frontmatter.heroImage"
          key="light"
          :class="{ light: Boolean($frontmatter.darkHeroImage) }"
          :src="$withBase($frontmatter.heroImage)"
          :alt="$frontmatter.heroAlt || 'HomeLogo'"
        />
        <img
          v-if="$frontmatter.darkHeroImage"
          key="dark"
          class="dark"
          :src="$withBase($frontmatter.darkHeroImage)"
          :alt="$frontmatter.heroAlt || 'HomeLogo'"
        />
      </MyTransition>
      <div class="hero-info">
        <MyTransition :delay="0.04">
          <h1
            v-if="$frontmatter.heroText !== false"
            id="main-title"
            v-text="$frontmatter.heroText || $title || 'Hello'"
          />
        </MyTransition>
        <MyTransition :delay="0.08">
          <p
            class="description"
            v-text="
              $frontmatter.tagline ||
              $description ||
              ''
            "
          />
        </MyTransition>
        <MyTransition :delay="0.12">
          <p v-if="$frontmatter.action" class="action">
            <NavLink
              v-for="action in actionLinks"
              :key="action.text"
              :item="action"
              class="action-button"
            />
          </p>
        </MyTransition>
      </div>
    </header>
   

    <MyTransition :delay="0.16">
    
      <div class="shortcuts">
        <div
          v-for="(shortcuts, index) in shortcuts"
          :key="index"
          :class="shortcuts.color"
          class="shortcut"
          @click="shortcuts.url ? navigate(shortcuts.url) : ''"
        >
          <h2>{{ shortcuts.name }}</h2>
          <p>{{ shortcuts.intro }}</p>
        </div>
      </div>
    </MyTransition>

    <MyTransition :delay="0.24">
      <Content class="theme-default-content custom" />
    </MyTransition>
  </main>
</template>

<script src="./shortcuts" />

<style lang="stylus">
.cheese
  background-color #e8ae44

.sky-blue
  background-color #44a8e1

.red
  background-color #e54d42

.teal
  background-color #59ab98

.orange
  background-color #f37b1d

.yellow
  background-color #fbbd08

.olive
  background-color #8dc63f

.green
  background-color #39b54a

.cyan
  background-color #39b54a

.green
  background-color #1cbbb4

.blue
  background-color #39b54a

.green
  background-color #0081ff

.purple
  background-color #6739b6

.mauve
  background-color #9c26b0

.pink
  background-color #e03997

.brown
  background-color #a5673f

.grey
  background-color #8799a3

.black
  background-color #333333

.darkGray
  background-color #666666

.gray
  background-color #aaaaaa

.ghostWhite
  background-color #f1f1f1

.white
  background-color #ffffff

.home
  max-width $homePageWidth
  min-height 100vh - $navbarHeight
  padding $navbarHeight 2rem 0
  margin 0px auto
  display block

  @media (max-width $MQNarrow)
    min-height 100vh - $navbarMobileHeight
    padding-top $navbarMobileHeight

  @media (max-width $MQMobileNarrow)
    padding-left 1.5rem
    padding-right 1.5rem

  .hero
    text-align center

    @media (min-width $MQNarrow)
      display flex
      justify-content space-evenly
      align-items center
      text-align left

    img
      display block
      max-width 100%
      max-height 320px
      margin 0

      @media (max-width $MQNarrow)
        max-height 280px
        margin 3rem auto 1.5rem

      @media (max-width $MQMobile)
        max-height 240px
        margin 2rem auto 1.2rem

      @media (max-width $MQMobileNarrow)
        max-height 210px
        margin 1.5rem auto 1rem

      .theme-light &
        &.light
          display block

        &.dark
          display none

      .theme-dark &
        &.light
          display none

        &.dark
          display block

    h1
      font-size 3rem

      @media (max-width $MQMobile)
        font-size 2.5rem

      @media (max-width $MQMobileNarrow)
        font-size 2rem

    h1, .description, .action
      margin 1.4rem auto

      @media (max-width $MQMobile)
        margin 1.2rem auto

      @media (max-width $MQMobileNarrow)
        margin 1rem auto

    .description
      max-width 35rem
      color var(--text-color-l40)
      font-size 1.2rem
      line-height 1.1

      @media (max-width $MQMobile)
        font-size 1.4rem

      @media (max-width $MQMobileNarrow)
        font-size 1.2rem

    .action-button
      display inline-block
      margin 0.6rem 0.8rem
      padding 0.8rem 1.6rem
      border-bottom 1px solid var(--accent-color-d10)
      border-radius 0.25rem
      background var(--accent-color)
      color var(--white)
      font-size 1.2rem
      transition background 0.1s ease
      overflow hidden

      @media (max-width $MQMobileNarrow)
        padding 0.6rem 1.2rem
        font-size 1rem

      &:hover
        background var(--accent-color-l10)

  .shortcuts
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items stretch
    align-content space-between
    margin 0 -2rem
    padding 1.2rem 0
    border-top 1px solid $borderColor

    @media (max-width $MQMobile)
      align-items stretch
      flex-direction row

    @media (max-width $MQMobileNarrow)
      align-items stretch
      margin 0 -1.5rem

    .shortcut
      cursor pointer    
      display flex
      flex-direction column
      flex-flow row wrap
      align-content flex-start
      justify-content left
      flex-basis calc(25% - 5rem)
      margin 1rem 1rem
      padding 0 1.5rem
      border-radius 1rem
      transition transform 0.3s, box-shadow 0.3s
      overflow hidden

      @media (max-width $MQNarrow)
        flex-basis calc(33% - 5rem)

      @media (max-width $MQMobileNarrow)
        flex-basis calc(50% - 5rem)

      &.link
        cursor pointer

      &:hover
        transform scale(1.05)
        box-shadow 0 2px 12px 0 var(--card-shadow-color)

      h2
        width 100%
        margin-bottom 0
        border-bottom none
        color #ffffff
        font-size 1.2rem
        font-weight 700
        white-space nowrap
        overflow hidden

        @media (max-width $MQMobileNarrow)
          font-size 1rem

      p
        margin-top 0
        color #f1f1f1
        font-size 0.9rem
        font-weight 500
        text-align left
        text-overflow -o-ellipsis-lastline
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 4
        -webkit-box-orient vertical

      @media (max-width $MQMobile)
        font-size 0.5rem

      @media (max-width $MQMobileNarrow)
        font-size 0.2rem

  {$contentClass}
    padding-bottom 1.5rem
</style>
