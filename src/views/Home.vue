<template>
    <b-row class="justify-content-center">
        <b-col cols="11">
            <b-row v-if="videos.length !== 0">
                <b-col>
                    <b-row class="">
                        <b-col cols="12" sm="6" md="4" lg="3" class="my-3"
                               v-for="(video, $index) in videos" :key="$index"
                        >
                            <VideoComponent
                                    :src="getUrlToVideo(video)"
                                    :video="video"
                                    url-to-author="http://localhost:9000/"
                            ></VideoComponent>
                        </b-col>
                    </b-row>
                    <b-row class="justify-content-center">
<!--                        <router-link :to="{name: 'WatchVideo', query: {hash: videos[0].hash, resolution: '1080'}}"-->
<!--                                     class="stretched-link">Link</router-link>-->
                        <b-col>
                            <infinite-loading spinner="spiral" @infinite="infiniteHandler">
                                <span slot="no-more"></span>
                            </infinite-loading>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>


            <b-row v-else>
                <b-col class="text-center m-5">
                    <h3>No videos here yet</h3>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
    import VideoComponent from "@/components/VideoComponent";
    import InfiniteLoading from "vue-infinite-loading";

    // var VideoType = {
    //     "videoID": 2,
    //     "name": "test_video",
    //     "description": null,
    //     "authorUsername": "anotherUser",
    //     "hash": "66bc213a91678da2f162f72d9fd6922c",
    //     "resolutionHeight": "240"
    // };

    // const videoPath = "http://localhost:8000/video/stream/mp4/toystory";

    export default {
        name: "Home",
        components: {
            VideoComponent, InfiniteLoading
        },
        data: function () {
            return {
                apiURL: "http://localhost:9001/api/video",
                videos: [],
                numberOfElements: -1,
                currentPageNumber: 1,
                sizePerPage: 1,
                loading: false
            }
        },
        created: function () {
            this.getVideosPage(0)
        },
        methods: {
            getVideosPage(page, $state) {
                // console.log("Updating. page: ", page, " inp: ", searchInput)
                console.log(this.$route.query)
                let config
                if (this.$route.query['search'])
                    config = {
                        'params':
                            {
                                'page': page,
                                'size': this.sizePerPage,
                                'videoName': this.$route.query['search'],
                            }
                    }
                else
                    config = {
                        'params':
                            {'page': page, 'size': this.sizePerPage}
                    }

                this.loading = true
                this.$http
                    .get(this.apiURL, config)
                    .then(response => {
                        this.loading = false
                        let elemCount = this.numberOfElements;

                        response.data.content.forEach(video => this.videos.push(video))
                        this.numberOfElements += response.data.numberOfElements

                        if ($state) {
                            if (elemCount === this.numberOfElements) {
                                $state.complete();
                            } else {
                                this.currentPageNumber += 1;
                                $state.loaded();
                            }
                        }
                    })
                    .catch(error => {
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
                    });
            },
            infiniteHandler($state) {
                setTimeout(() => {
                    this.getVideosPage(this.currentPageNumber, $state);
                }, 100)
            },
            getUrlToVideo(video) {
                console.log(video.hash);
                return `${this.apiURL}/thumbnail/${video.hash}`
            }
        }
    }
</script>

<style scoped>

</style>