<template>
    <canvas/>
</template>

<script>
    export default {
        name: "player",
        props: {
            streamUrl: {
                type: String,
                default: '',
                required: true
            }
        },
        data() {
            return {
                url: this.streamUrl,
                useWorker: true,
                workerFile: '',
                webgl: false
            }
        },
        methods: {
            test: {}
        },
        mounted() {
            console.group('url');
            console.log(this.streamUrl);
            console.groupEnd();
        }
    }
</script>