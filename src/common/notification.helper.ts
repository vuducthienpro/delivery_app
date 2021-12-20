import  fcmPush from 'fcm-push';
const PUSH_KEY='AAAAEaa5trk:APA91bGJD5XRbptkvrwiRYpCaCibnXJAduZt8vs6QtODYd-Vjg74STXdd_36QSV-3Zpyl6pa4-_SsV9k4QELhLgSdgahMiQrVVxYrAuRbfyRKS1A9B-3YK78CWyLBGUxVbMCageeaRfY';
const fcmService = new fcmPush(PUSH_KEY);
export interface PushMessage{
    to?:string,
    registration_ids:string[],
    collapse_key?:string,
    notification:{title:string,body:string,image?:string},
    data?:{[index:string]:string},
    apns?:{
        fcm_options?:{image:string}
    }
}
export const sendNotificationToMobile=(message:PushMessage)=>{
    fcmService.send(message,(err, response)=>{
        if (err) {
            console.log(err);
            console.log('Push Notification False');
        } else {
            console.log(response);
        }
    });
}