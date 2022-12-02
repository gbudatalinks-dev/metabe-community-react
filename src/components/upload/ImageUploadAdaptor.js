import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

export class ImageUploadAdaptor {

    constructor(loader, uid) {
        this.loader = loader;
        this.uid = uid;
    }

    upload() {
        return this.loader.file.then(
            file =>
                new Promise((resolve, reject) => {
                    let storageRef = ref(storage, `${this.uid}/images/${file.name}`);
                    uploadBytes(storageRef, file)
                        .then(() => getDownloadURL(storageRef))
                        .then(url => resolve({
                            default: url
                        }))
                        .catch(error => {
                            console.error(error);
                            reject("Failed to upload");
                        });
                })
        );
    }

}
