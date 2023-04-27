<template>
    <b-row class="justify-content-center">

        <b-col cols="8" class="mt-5">
            <b-row>
                <b-col>
                    <b-button class="p-2" block v-b-toggle.accordion-1 variant="outline-info">Settings</b-button>
                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" visible>
                        <b-card-body>
                            <b-row>
                                <b-col>
                                    <b-form-input v-model="filename" placeholder="Enter video name"></b-form-input>
                                </b-col>
                            </b-row>
                            <hr>
                            <b-row>
                                <b-col>
                                    <b-form-input v-model="username" placeholder="Enter your name"></b-form-input>
                                </b-col>
                            </b-row>
                            <hr>
                            <b-row>
                                <b-col>
                                    <b-form-textarea
                                            id="textarea"
                                            v-model="description"
                                            placeholder="Enter description..."
                                            rows="3"
                                            max-rows="6"
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-collapse>
                </b-col>

                <hr>
            </b-row>

            <hr>

            <b-row>
                <b-col>
                    <file-pond
                            :disabled="inputDisables"
                            id="file-upload"
                            name="file"
                            ref="pond"
                            :allow-multiple="false"
                            :max-files="1"
                            accepted-file-types="video/mp4, video/ogg"
                            v-bind:files="myFiles"
                            v-on:initfile="addMetadata"
                            v-on:processfile="handleFilePondLoad"
                    />
                </b-col>
            </b-row>


            <b-row v-if="!loading">
                <b-col></b-col>

                <b-col></b-col>
            </b-row>
            <b-row v-else>
                <b-col></b-col>
                <b-col cols="6" class="text-center mx-5 my-2">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
    // Import Vue FilePond
    import vueFilePond,{ setOptions } from 'vue-filepond';
    // Import FilePond styles
    import 'filepond/dist/filepond.min.css';
    // Import image preview and file type validation plugins
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
    // Create component
    const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginFileMetadata);

    const axios = require('axios');

    function processUpload(fieldName, file, metadata, load, error, progress, abort, transfer, options) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!", abort, transfer, options)

        // set data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', metadata['filename'])
        formData.append('username', metadata['username'])
        formData.append('description', metadata['description'])

        console.log(formData)

        // related to aborting the request
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        // the request itself
        axios({
            method: 'post',
            url: "http://localhost:9001/api/video/upload/",
            data: formData,
            cancelToken: source.token,
            onUploadProgress: (e) => {
                // updating progress indicator
                progress(e.lengthComputable, e.loaded, e.total);
            }
        }).then(response => {
            // passing the file id to FilePond
            console.log("File id: " + response.data.data.id)
            load(response.data.data.id)
        }).catch((thrown) => {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                // handle error
            }
        });

        // Setup abort interface
        return {
            abort: () => {
                source.cancel('Operation canceled by the user.');
            }
        };
    }

    setOptions({
        server: {
            url: '',
            process: processUpload
        }
    });

    export default {
        name: "UploadVideo",
        components: {
            FilePond
        },
        data(){
            return {
                filename: "",
                username: '',
                description: '',
                myFiles: [],
                loading: false
            }
        },
        methods: {
            handleFilePondLoad(data) {
                if (data) {
                    console.log(data.error);
                    console.log(data.code);
                    if (data.code === 200){
                        this.myFiles = this.$refs.pond.getFiles();
                    }
                } else {
                    this.myFiles = this.$refs.pond.getFiles();
                }
            },
            addMetadata(file){
                console.log(file);
                file.setMetadata("username", this.username);
                file.setMetadata("filename", this.filename)
                file.setMetadata("description", this.description)
            }

        },
        computed:{
            inputDisables: function (){
                return this.filename.length <= 3 || this.username.length <= 3
            }
        }
    }
</script>

<style scoped>

</style>