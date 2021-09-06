<template>
    <section class="header">
        <div class="promo-notice">Something about promotions here</div>
        <ul v-if="nav" class="menu-l1">
            <li v-for="l1 in nav.l1_links" class="menu-item" :key="l1.uid"
                @click="selectSubMenu(l1.uid)">
                {{l1.link_text}}
            </li>
        </ul>
        <div class="logo">
            <svg viewBox="0 0 77 32" id="levi-logo"><path d="M61.403 19.729c-4.692 0-5.547-2.747-5.547-3.428h3.398c0 .4.535.879.986 1.074a2.882 2.882 0 001.177.192h-.006c.957 0 1.742-.235 1.742-.798 0-.686-.804-.838-1.69-.966-2.413-.353-5.794-.763-5.794-3.498 0-2.551 2.749-3.849 5.667-3.849 4.672 0 5.91 2.623 5.91 3.382h-3.453a1.147 1.147 0 00-.634-.908l-.007-.003a3.024 3.024 0 00-1.357-.335h-.002c-1.29 0-2.016.272-2.016.871 0 .489.654.732 1.594.895 2.453.427 6.219.575 6.219 3.599 0 1.536-1.313 3.77-6.186 3.77zm-5.764-9.675l-1.323 1.458h-.55l.606-1.59H53.16v-2.12h2.479zm-7.69-1.343h4.391v10.713h-4.391zm-5.726 10.734h-3.837L32.657 8.731h5.17l3.288 6.512.09.196.082-.196 3.074-6.512h3.104zm-8.243-4.451h-8.886a2.529 2.529 0 002.719 2.44l-.009.001a2.714 2.714 0 002.347-1.136l.006-.008H33.7c-1.158 2.697-3.405 3.463-6.467 3.463-3.983 0-6.799-2.185-6.799-5.647 0-3.697 2.774-5.648 6.799-5.648 4.503 0 6.761 2.957 6.761 5.803a5.486 5.486 0 01-.017.753l.002-.021zm-13.621 4.434H10.232V8.74h4.553v7.78h5.574zM72.236 0c.032.067.068.132.098.201.268.607.424 1.316.424 2.061v.045-.002.054c0 .754-.156 1.471-.437 2.121l.013-.035a5.473 5.473 0 01-1.144 1.701 5.135 5.135 0 01-1.646 1.11l-.034.013a5.188 5.188 0 01-2.015.401h-.035.002-.029c-.73 0-1.426-.147-2.059-.414l.035.013a5.243 5.243 0 01-1.695-1.123 5.403 5.403 0 01-1.136-1.666l-.013-.035a5.253 5.253 0 01-.425-2.086v-.057V2.262c0-.745.156-1.453.438-2.094l-.013.033c.03-.069.066-.134.099-.201H.001L7.41 32c15.555-10.136 30.504-.395 31.106-.024h.002l.004-.003h.008l.004.002.003.001c.6-.372 15.551-10.112 31.105.024L77.05 0zM27.148 10.699h-.017a2.048 2.048 0 00-2.048 2.048l.002.1v-.005h4.301a2.027 2.027 0 00-2.249-2.143l.009-.001zM64.35 5.581a4.237 4.237 0 003.072 1.316h.042-.002.037c.605 0 1.18-.129 1.699-.361l-.026.011a4.306 4.306 0 001.376-.964l.002-.002c.385-.407.695-.889.907-1.421l.011-.03c.21-.527.332-1.139.332-1.778v-.049V2.269a4.77 4.77 0 00-.344-1.784l.011.032a4.705 4.705 0 00-.26-.54l.012.023h-1.502c.147.266.233.584.233.922l-.001.07V.989a1.522 1.522 0 01-.466 1.236l-.001.001c-.315.26-.714.43-1.15.465h-.007l1.765 2.761h-1.031L67.38 2.763h-1.017v2.689h-.959V0h-1.723c-.08.14-.163.31-.236.485l-.012.031a4.697 4.697 0 00-.332 1.75v.039-.002.048c0 .639.122 1.25.344 1.81l-.012-.033c.222.563.532 1.045.919 1.454l-.002-.002zm3.629-3.627c.189-.011.364-.054.525-.125l-.01.004a.813.813 0 00.358-.304l.002-.003c.086-.15.136-.329.136-.52l-.002-.062v.003l.001-.043a.933.933 0 00-.123-.463l.002.005a.828.828 0 00-.307-.284L68.557.16a1.302 1.302 0 00-.431-.134l-.007-.001a3.097 3.097 0 00-.211-.024h-1.546v1.975h1.002q.325 0 .614-.021z"></path></svg>
        </div>
    </section>
    <section v-if="nav" class="sub-menu" :class="{'active': showSubMenu, 'l3-active': l3Active}">
        <div class="close" @click="showSubMenu = false; l3Active = false"></div>
        <ul v-for="l1 in nav.l1_links" class="menu-l2" 
            :class="{'active': l1.uid === subMenuUID }" :key="`${l1.link_text}-${l1.uid}`">
            <li class="l2-menu-header">{{l1.link_text}}</li>
            <li v-for="l2 in l1.l2_links" @click="showL3(l2)"
                class="menu-item" :key="l2.uid">
                <a href="#" :class="{'selected': activeL2?.uid === l2.uid}">{{l2.link_text}}</a>
            </li>
        </ul>
        <ul v-if="activeL2" class="menu-l3" :class="{'active': l3Active, 'pulse': pulse}">
            <li v-for="l3 in activeL2.l3_links"
                class="menu-item" :key="l3.uid">
                <router-link :to="`${l3.link.link_url}`">{{l3.link_text}}</router-link>
            </li>
        </ul>
    </section>
</template>
<script>
import { ref, onMounted, watch } from "vue";

import {appState} from "@/state/appState";
import { useRoute } from 'vue-router'

export default {
  props: {
  },

  setup(props) {
    const nav = ref(null);
    const subMenuUID = ref(null);
    const showSubMenu = ref(false);
    const l3Active = ref(false);
    const activeL2 = ref(null);
    const pulse = ref(false);
    // route object
    const route = useRoute()

    console.log("Header PROPS :: ", props);

    const { fetchNav } = appState();

    const selectSubMenu = (uid) => {
        if (subMenuUID.value !== uid) {
            subMenuUID.value = uid;
            showSubMenu.value = true;
        } else {
            showSubMenu.value = !showSubMenu.value;
        }
    }

    const showL3 = (l2) => {
        activeL2.value = l2;
        l3Active.value = true;
        window.setTimeout(() => {
            pulse.value = true;
        }, 250);
        pulse.value = !pulse.value;
        console.log('L2 :: ', l2);
    }

    onMounted(() => {
        if (window.__PUPPETEER_HEADER_CTX__) {
            nav.value = window.__PUPPETEER_HEADER_CTX__.nav;
        } else {
            fetchNav().then(function (data) {
                console.log("DATA :: ", data[0].data.cmsContent.data.entries[0].header_category_links[0]);
                nav.value = data[0].data.cmsContent.data.entries[0].header_category_links[0];
            }).catch(function (error) {
                console.log(error);
            });
        } 
    });

    watch(
      () => route.params.code,
      () => {
          console.log("CODE :: ", route.params.code)
          showSubMenu.value = false;
          l3Active.value = false;
      }
    )

    return {
        nav,
        subMenuUID,
        pulse,
        l3Active,
        activeL2,
        selectSubMenu,
        showSubMenu,
        showL3
    };
  },
};
</script>
<style scoped lang="scss">
.sub-menu {
    display: flex;
    position: absolute;
    z-index: 100001;
    top: 0;
    width: 0px;
    background: white;
    border-right: 0px solid #d0d0d0;
    transition: all .250s ease-in;
    a {
        color: #0a0a0a;
        text-decoration: none;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            width: 0px;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: #0a0a0a;
            visibility: hidden;
            transition: all 0.3s ease-in-out 0.2s;
        }
        &:hover, &.selected {
            color: #0a0a0a;
            transform: scale(1.3, 1.3);
            &::before {
                visibility: visible;
                width: 100%;
            }
        }
    }
    &.active {
        border-right: 1px solid #d0d0d0;
        display: flex;
        width: 33vw;
    }
    &.l3-active {
        width: 66vw;
    }
    .close{
        &:after {
            content: '✕';
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 18px;
            font-weight: 900;
        }
    }
    .menu-l3 {
        list-style-type: none;
        text-align: left;
        padding: 0;
        margin-top: 80px;
        width: 0;
        overflow: hidden;
        opacity: 0;
        transition: width .5s ease-in;
        &.active {
            width: 33vw;
            overflow: auto;
        }
        &.pulse {
            opacity: 1;
            transition: opacity .5s ease-in;
        }
        li {
            line-height: 28px;
        }
    }
    .menu-l2 {
        display: none;
        list-style-type: none;
        flex-direction: column;
        height: 100vh;
        width: 33vw;
        overflow-x: hidden;
        margin: 0;
        &.active {
            display: flex;
        }
        .l2-menu-header {
            text-transform: uppercase;
            font-weight: 900;
            font-size: 18px;
            padding: 10px 0;
        }
        li {
            text-align: left;
            flex-basis: 50px;
            line-height: 50px;
            font-size: 28px;
            font-weight: 900;
            white-space: nowrap;
        }
    }
}
.header {
    position: relative;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    // border-bottom: 1px solid #d0d0d0;
    .logo {
        width: 77px;
        position: relative;
        margin: 0 auto;
        top: -40px;
        fill: #c41320;
    }
    .promo-notice {
        text-align: center;
        font-size: 14px;
    }
    .menu-l1 {
        list-style-type: none;
        display: flex;
        flex-direction: row;
        line-height: 30px;
        padding: 0;
        li {
            flex-basis: 120px;
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
        }
    }
}
</style>