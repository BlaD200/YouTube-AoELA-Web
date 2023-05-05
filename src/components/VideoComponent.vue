<template>
    <div @click="goToVideo" class="video">
        <div>
            <div id="introVid1" class="video-container">
                <img :src="src" />
            </div>
<!--            <div class="embed-responsive embed-responsive-16by9">-->
<!--                <iframe class="embed-responsive-item" :src="src" allowfullscreen></iframe>-->
<!--&lt;!&ndash;                <iframe class="embed-responsive-item" :src="src"></iframe>&ndash;&gt;-->
<!--&lt;!&ndash;                <video class="embed-responsive-item"&ndash;&gt;-->
<!--&lt;!&ndash;                       type="video/mp4"&ndash;&gt;-->
<!--&lt;!&ndash;                       :src="src"&ndash;&gt;-->
<!--&lt;!&ndash;                       :controls="controls"&ndash;&gt;-->
<!--&lt;!&ndash;                >&ndash;&gt;-->
<!--&lt;!&ndash;                    <p>Your browser doesn't support site content</p>&ndash;&gt;-->
<!--&lt;!&ndash;                </video>&ndash;&gt;-->
<!--            </div>-->
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

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        border: 1px solid #111;
        margin: 2% 0;
        cursor: pointer;
    }

    .video-container img,
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .video-container img:hover {
        opacity: 0.8;
    }
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