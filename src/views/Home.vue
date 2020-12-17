<template>
    <b-row class="justify-content-center">
        <b-col cols="11">
            <b-row class="">
                <b-col cols="12" sm="6" class="my-3 col-lg-4"
                       v-for="videoUrlIndex in videoUrlsIndexes"
                       v-bind:key="videoUrlIndex"
                >
                    <VideoComponent
                            :src="videoUrls[videoUrlIndex]"
                            title="Toys story AND SOMETHIN ELSE LONG And enother text jwnvkjsdnv kjn"
                            author="author name"
                            :url-to-video="videoUrl"
                            url-to-author="http://localhost:9000/"
                    ></VideoComponent>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
    import VideoComponent from "@/components/VideoComponent";

    const videoPath = "http://localhost:8000/video/stream/mp4/toystory";

    export default {
        name: "Home",
        components: {
            VideoComponent
        },
        data: function () {
            return {
                videoUrls: [videoPath, videoPath, videoPath, videoPath, videoPath],
                videoUrlsIndexes: [0,1,2,3,4]
            }
        }
    }
</script>

<style scoped>

</style>