import  fcmPush from 'fcm-push';
const PUSH_KEY='AAAAYhjYrUk:APA91bHkb798Tl5zzLzaa8gtRFom21FcGdtt7W3_jnMLfsgrxLqQNYf3nHWN_9qrJPQa82eIlc46kX6__J9HcN2QaELkXup_1-HnagT90QDIv4TMuGiANGss5eq9fiPgcWM2EWOH_foe';
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