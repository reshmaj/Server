import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class Mygallery {
    constructor(data) {
        this.data = data;
        this.MYGALLERY_SERVICE = 'galleries';
        this.mygalleryArray = [];

    }

    async getUserMygallery(id) {
        let response = await this.data.get(this.MYGALLERY_SERVICE + "/user/" + id);
        if (!response.error && !response.message) {
            this.mygalleryArray = response;
        }
    }

    async save(mygallery) {
            if (mygallery) {
            if (!mygallery._id) {
                let serverResponse = await this.data.post(mygallery, this.MYGALLERY_SERVICE);
                if (!serverResponse.error) {
                    this.mypicsArray.push(serverResponse);
                }
                return serverResponse;
             } else {
                let serverResponse = await this.data.put(mygallery, this.MYGALLERY_SERVICE + "/" + mygallery._id);
                if (!serverResponse.error) {
                    // this.updateArray(response);
                }
                return serverResponse;
            }
        }


    }

    async deleteMypic(id) {
        let serverResponse = await this.data.delete(this.MYGALLERY_SERVICE + "/" + id);
        if (!serverResponse.error) {
            for (let i = 0; i < this.mygalleryArray.length; i++) {
                if (this.mygalleryArray[i]._id === id) {
                    this.mygalleryArray.splice(i, 1);
                }
            }
        }
    }
    async uploadFile(files, userId, mygalleryId){
                let formData = new FormData();
                files.forEach((item, index) => {
                formData.append("file" + index, item);
                });
            
            let serverResponse = await this.data.uploadFiles(formData, this.MYGALLERY_SERVICE +		"/upload/" + userId + "/" + mygalleryId);
            return serverResponse;
        }
        
}
