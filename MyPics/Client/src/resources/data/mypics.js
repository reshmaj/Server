import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class MyPics {
    constructor(data) {
        this.data = data;
        this.MYPIC_SERVICE = 'mypics';
        this.mypicsArray = [];

    }
  

    async getUserMypics(id) {
        let response = await this.data.get(this.MYPIC_SERVICE + "/user/" + id);
        if (!response.error && !response.message) {
            this.mypicsArray = response;
        }
    }

    async save(mypic) {
        console.log(mypic)
        if (mypic) {
            if (!mypic._id) {
                let serverResponse = await this.data.post(mypic, this.MYPIC_SERVICE);
                if (!serverResponse.error) {
                    this.mypicsArray.push(serverResponse);
                }
                return serverResponse;
             } else {
                let serverResponse = await this.data.put(mypic, this.MYPIC_SERVICE + "/" + mypic._id);
                if (!serverResponse.error) {
                    // this.updateArray(response);
                }
                return serverResponse;
            }
        }


    }

    async deleteMypic(id) {
        let serverResponse = await this.data.delete(this.MYPIC_SERVICE + "/" + id);
        if (!serverResponse.error) {
            for (let i = 0; i < this.mypicsArray.length; i++) {
                if (this.mypicsArray[i]._id === id) {
                    this.mypicsArray.splice(i, 1);
                }
            }
        }
    }
    async uploadFile(files, userId, mypicId){
                let formData = new FormData();
                files.forEach((item, index) => {
            formData.append("file" + index, item);
                });
            
            let serverResponse = await this.data.uploadFiles(formData, this.MYPIC_SERVICE +		"/upload/" + userId + "/" + mypicId);
            return serverResponse;
        }
        
}
