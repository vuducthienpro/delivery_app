import { BannerService } from '../services/BannerService';
import { message, status } from '../config/constant';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export class BannerController {
    public static getAllBanner = async (req, res) => {
        const bannerAll = await BannerService.getAllBanner();
        return res.json({
            data: bannerAll,
        });
    }

    public static getBannerById = async (req, res) => {
        const id = req.params.id;
        const banner = await BannerService.getBanner(id);
        if (!banner) {
            return res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND_BANNER,
            });
        }

        return res.json({
            data: banner,
        });
    }
}