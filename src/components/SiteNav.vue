<template>
  <header class="site-header">
    <button type="button" class="site-header__toggle" @click="toggleNav">
      <FontAwesomeIcon icon="bars" />
    </button>

    <nav :class="['site-nav', { 'is-active': isActive }]">
      <SiteSubnav
        :active="isActive"
        :children="nav"
        @close="toggleNav"
      />
    </nav>
  </header>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SiteSubnav from './SiteSubnav.vue'

const nav = [{
  active: false,
  label: "One",
  url: "/one",
  children: [
    {
      active: false,
      label: "One",
      url: "/one",
    },
    {
      active: false,
      label: "Two",
      url: "/two",
      children: [
        {
          active: false,
          label: "One",
          url: "/one",
        },
        {
          active: false,
          label: "Two",
          url: "/two",
        },
      ]
    },
    {
      active: false,
      label: "Three",
      url: "/three",
      children: [
        {
          active: false,
          label: "One",
          url: "/one",
          children: [
            {
              active: false,
              label: "One",
              url: "/one",
            },
            {
              active: false,
              label: "Two",
              url: "/two",
            },
          ]
        },
        {
          active: false,
          label: "Two",
          url: "/two",
        },
        {
          active: false,
          label: "Three",
          url: "/three",
        },
        {
          active: false,
          label: "One",
          url: "/one",
        },
        {
          active: false,
          label: "Two",
          url: "/two",
        },
        {
          active: false,
          label: "Three",
          url: "/three",
        },
        {
          active: false,
          label: "One",
          url: "/one",
        },
        {
          active: false,
          label: "Two",
          url: "/two",
        },
        {
          active: false,
          label: "Three",
          url: "/three",
        },
        {
          active: false,
          label: "One",
          url: "/one",
        },
        {
          active: false,
          label: "Two",
          url: "/two",
        },
        {
          active: false,
          label: "Three",
          url: "/three",
        },
      ]
    },
    {
      active: false,
      label: "One",
      url: "/one",
    },
    {
      active: false,
      label: "Two",
      url: "/two",
    },
    {
      active: false,
      label: "Three",
      url: "/three",
    },
  ]
}, {
  label: "Two",
  url: "/two",
}, {
  active: false,
  label: "One",
  url: "/one",
},
{
  active: false,
  label: "Two",
  url: "/two",
},
{
  active: false,
  label: "Three",
  url: "/three",
},
{
  active: false,
  label: "One",
  url: "/one",
},
{
  active: false,
  label: "Two",
  url: "/two",
},
{
  active: false,
  label: "Three",
  url: "/three",
},
{
  active: false,
  label: "One",
  url: "/one",
},
{
  active: false,
  label: "Two",
  url: "/two",
},
{
  active: false,
  label: "Three",
  url: "/three",
}]

export default {
  components: {
    FontAwesomeIcon,
    SiteSubnav
  },
  data() {
    return {
      isActive: false,
      nav: nav,
    };
  },
  methods: {
    toggleNav() {
      this.isActive = !this.isActive;
    }
  }
}
</script>

<style lang="scss">
.site-nav {
  max-width: 375px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform .3s cubic-bezier(0.950, 0.050, 0.795, 0.035);
  transform: translateX(-100%);
  &.is-active {
    transform: translateX(0);
    transition-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
  }
  > .site-nav-panel {
    transform: translateX(0);
  }
}

.site-header__toggle {
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  padding: 1em;
}
</style>