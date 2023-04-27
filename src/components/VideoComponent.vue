<template>
    <div @click="goToVideo" class="video">
        <div>
            <div class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item"
                       type="video/mp4"
                       :src="src"
                       :controls="controls"
                >
                    <p>Your browser doesn't support site content</p>
                </video>
            </div>
            <div class="ml-2 mr-3 mt-2">
                <h3 class="title">{{video.name}}</h3>
                <a @click="goToAuthor" class="author" :href="urlToAuthor">{{video.authorUsername}}</a>
            </div>
            <router-link :to="{name: 'WatchVideo', query: {hash: video.hash, resolution: video.resolutionHeight}}"
                         class="stretched-link"></router-link>
        </div>

    </div>

</template>

<script>

    export default {
        name: "VideoComponent",
        props: {
            src: String,
            controls: Boolean,
            video: Object,
            urlToAuthor: String
        },
        data: function () {
            return {
                isGoToAuthor: false
            }
        },
        methods: {
            goToVideo() {
                if (!this.isGoToAuthor) {
                    console.log("Clicked video div")
                    // window.location = (this.urlToVideo);
                }
            },
            goToAuthor() {
                console.log("Clicked author");
                this.isGoToAuthor = true;
            }
        },
        computed: {
            description() {
                return this.video.description === null ? "" : this.video.description
            }
        }
    }
</script>

<style scoped>
    .video {
        cursor: pointer;
    }

    .title {
        display: -webkit-box;
        font-size: 1.0rem;
        line-height: 1.2rem;
        max-height: 4rem;
        /*font-weight: 500;*/
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .author {
        color: #aaa;
        text-decoration: none;
        position: relative;
        z-index: 10;
    }

    .author:hover {
        color: white;
    }

    .stretched-link::after {
        margin: 0 1rem;
        z-index: 1;
    }

    /*.stretched-link:hover::after {*/
    /*    border: 1px solid aliceblue;*/
    /*}*/
</style>