<template>
    <b-row>
        <b-col>
            <div class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item"
                       type="video/mp4"
                       :src="getUrlToVideo()"
                       :controls="true"
                >
                    <p>Your browser doesn't support site content</p>
                </video>
            </div>
            <b-row jus>
                <b-col cols="12" md="8">
                    <div class="ml-2 mr-3 mt-2">
                        <h3 class="title">{{ video.name }}</h3>
                        <a class="author" href="#">{{ video.authorUsername }}</a>
                        <p class="mt-3">
                            {{ video.description }}
                        </p>
                    </div>
                </b-col>
                <b-col class="my-3 text-sm-right">
                    <div>
                        <div>
                            <b-button-group>
                                <b-button :disabled="!resolutionsAvailable.includes('240')"
                                          :variant="resolutionLoaded === '240' ? 'info' : ''"
                                          @click="changeResolution('240')">240
                                </b-button>
                                <b-button :disabled="!resolutionsAvailable.includes('360')"
                                          :variant="resolutionLoaded === '360' ? 'info' : ''"
                                          @click="changeResolution('360')">360
                                </b-button>
                                <b-button :disabled="!resolutionsAvailable.includes('720')"
                                          :variant="resolutionLoaded === '720' ? 'info' : ''"
                                          @click="changeResolution('720')">720
                                </b-button>
                                <b-button :disabled="!resolutionsAvailable.includes('1080')"
                                          :variant="resolutionLoaded === '1080' ? 'info' : ''"
                                          @click="changeResolution('1080')">1080
                                </b-button>
                            </b-button-group>
                        </div>
                    </div>
                </b-col>
            </b-row>

        </b-col>
    </b-row>
</template>

<script>
// import VideoComponent from "@/components/VideoComponent";

export default {
    name: "VideoView",
    components: {
        // VideoComponent
    },
    created() {
        const videoRequestUrl = (hash, resolution) => `${this.apiURL}/${hash}/${resolution}`;

        console.log(this.$route.params, this.$route.query)
        this.$http
            .get(videoRequestUrl(this.$route.query.hash, this.$route.query.resolution))
            .then(response => {
                console.log(response.data)
                this.video = response.data;
                this.resolutionLoaded = response.data.resolutionHeight
            })
            .then(() => {
                let config = {
                    'params':
                        {'videoName': this.video.name}
                }
                this.$http
                    .get(this.apiURL, config)
                    .then(response => {
                        console.log(response.data.content)
                        response.data.content.forEach(video => {
                            if (video.hash === this.$route.query.hash) {
                                this.resolutionsAvailable.push(video.resolutionHeight)
                            }
                        })
                        this.numberOfElements += response.data.numberOfElements
                    })
                    .catch(error => {
                        this.handleError(error)
                    });
            })
            .catch(error => {
                this.handleError(error)
            });
    },
    data() {
        return {
            apiURL: "http://localhost:9001/api/video",
            title: "",
            author: "",
            video: Object,
            resolutionLoaded: "",
            resolutionsAvailable: []
        }
    },
    methods: {
        getUrlToVideo() {
            return `${this.apiURL}/stream?videoHash=${this.$route.query.hash}&resolutionHeight=${this.$route.query.resolution}`
        },
        changeResolution(res) {
            window.location = `http://localhost:8080/watch?hash=${this.$route.query.hash}&resolution=${res}`
        },
        handleError(error){
            this.loading = false
            if (error.response) {
                console.log(error.response.status)
                if (error.response.status === 403)
                    this.$root.messageBoxOk('Error while loading users',
                        "You have no authorities to perform this action.")
                else
                    this.$root.messageBoxOk('Error while loading users user',
                        error.response.statusText + '' + error.response.status)
            } else if (error.request) {
                console.log(error.request)
                this.$root.messageBoxOk('Error while loading users',
                    "Error while connecting to server")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }
}
</script>

<style scoped>
.title {
    display: -webkit-box;
    font-size: 2rem;
    line-height: 2rem;
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
</style>