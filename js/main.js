import player from '/src/dist/player.vue';

let app = new Vue({
    el: '.vue__app',
    components: [player,],
    data: {
        test: true
    }
});

app.component();