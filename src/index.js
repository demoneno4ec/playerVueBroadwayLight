"use strict";

import Vue from 'vue'
import player from './dist/player.vue';

window.onload = function () {
    let worker = new Worker('/js/lib/Decoder.js');
    new Vue({
        el: '.vue__app',
        render: h => h(player, {
            props: {
                worker: worker
            }
        })
    });
}