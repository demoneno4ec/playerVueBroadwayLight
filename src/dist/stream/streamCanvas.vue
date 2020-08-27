<template>
    <canvas ref="video-canvas"/>
</template>

<script>
    import {eventBus} from './eventBus';

    export default {
        name: "streamCanvas",
        data() {
            return {
                canvas: null,
                canvasContext: null,
                imageData: null,
                width: 100,
                height: 100,
            }
        },
        methods: {
            getContext() {
                return this.canvas.getContext('2d');
            },
            renderFrame(options) {
                if (typeof options.width !== 'undefined' && options.width !== this.width) {
                    this.width = options.width;
                    this.canvas.width = this.width;
                }

                if (typeof options.height !== 'undefined' && options.height !== this.height) {
                    this.height = options.height;
                    this.canvas.height = this.height;
                }

                if (!this.canvasContext) {
                    this.canvasContext = this.getContext();
                }


                this.imageData = this.canvasContext.getImageData(0, 0, this.width, this.height);

                this.imageData.data.set(options.data)

                this.canvasContext.putImageData(this.imageData, 0, 0);
            }
        },
        mounted() {
            this.canvas = this.$refs['video-canvas'];
            this.canvasContext = this.getContext();
            this.imageData = this.canvasContext.getImageData(0, 0, this.width, this.height);

            eventBus.$on('renderFrame', (options) => {
                this.renderFrame(options)
            });
        }
    }
</script>