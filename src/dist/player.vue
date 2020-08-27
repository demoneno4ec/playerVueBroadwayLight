<template>
    <stream :worker="this.worker"
            :url="this.url"
    ></stream>
</template>

<script>
    import stream from './stream/stream.vue';
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
    }
</script>