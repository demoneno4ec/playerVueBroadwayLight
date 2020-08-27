"use strict";

import Vue from 'vue'
import player from './dist/player.vue';
import {streamUrl} from "./dist/constants/streamUrl";

window.onload = function () {
    let app = new Vue({
        el: '.vue__app',
        render: h => h(player, {
            props: {
                streamUrl: streamUrl
            }
        })
    });
}