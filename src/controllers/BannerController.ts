import { BannerService } from '../services/BannerService';
import { message, status } from '../config/constant';

export class BannerController {
    public getAllBanner = async (res) => {
        const data = await BannerService.getAllBanner();
        if(!data) {
            res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND_BANNER,
            });
        }
        res.json({
            data,
        });
    }
}