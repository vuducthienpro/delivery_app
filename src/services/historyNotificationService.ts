import HistoryNotificationModel from './../models/history-notification';
export class HistoryService {
    public static addHistory=(type:string,orderId:string)=>{
        return HistoryNotificationModel.create({
            type,
            order:orderId,
        })
    }
    public static getList=(orderId:string)=>{
        return HistoryNotificationModel.find({
            order:orderId,
        }).sort({created_at:-1})
    }
}