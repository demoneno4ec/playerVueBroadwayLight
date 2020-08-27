<template>
    <div>
        <stream :worker="this.worker"
                :url="this.url"
        ></stream>
        <button @click="this.play">play</button>
        <button @click="this.stop">stop</button>
    </div>
</template>

<script>
    import stream from './components/stream/stream.vue';
    import {eventBus} from './functions/eventBus';
    import {streamUrl} from "./constants/streamUrl";

    export default {
        name: "player",
        components: {stream},
        props: {
            worker: {
                type: Object,
                default: {},
                required: true
            }
        },
        data() {
            return {
                url: streamUrl,
            }
        },
        methods: {
            play() {
                eventBus.$emit('PlayVideo');
            },
            stop() {
                eventBus.$emit('PauseVideo');
            },
        }
    }
</script>