import ImagePicker from 'react-native-image-crop-picker'
import {awsApi} from './awsApi'

class ImageUploader {
    async chooseImageFromGallery() {
        return await ImagePicker.openPicker({
            width: 600,
            height: 600,
            compressImageMaxWidth: 600,
            compressImageMaxHeight: 600,
            // compressImageQuality: 100,
            waitAnimationEnd: true,
            cropping: true,
        })
    }
    async uploadImage(localImage: any): Promise<string> {
        return new Promise(async function (resolve, reject) {
            try {
                console.log('uploading an image....')
                const remoteImage = await awsApi.upload(localImage.path)
                console.log('upload finished ....' + JSON.stringify(remoteImage))
                resolve(remoteImage.body.postResponse.location)
            } catch (e) {
                reject(e)
            }
        })
    }
}
export default new ImageUploader()
