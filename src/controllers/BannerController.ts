import { BannerService } from '../services/BannerService';
import { message, status } from '../config/constant';
import express from 'express';
import bodyParser from 'body-parser';
import Banner from '../models/Banner';
import winston from '../config/winston';

const app = express();
app.use(bodyParser.json());

export class BannerController {
    public static getAllBanner = async (req, res) => {
        const bannerAll = await BannerService.getAllBanner();
        return res.json({
            data: bannerAll,
            status: status.OK,
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
        } else {
            return res.json({
                data: banner,
                status: status.OK,
            });
        }
    }

    public static createBanner = async (req, res) => {
        let newBanner:any;
        if (req.file) {
            newBanner = new Banner({
                url: req.file.originalname,
            });
        }
        const banner = await BannerService.createBanner(newBanner);
        if (!banner) {
            return res.json({
                status: status.BAD_REQUEST,
                message: message.CREATED_BANNER_FAILS,
            });
        } else {
            return res.json({
                status: status.CREATED_SUCCESS,
                data: banner,
            });
        }
    }

    public static updateBanner = async (req, res) => {
        const paramId = req.params.id;
        const dataBanner = await BannerService.getBanner(paramId);
        if (!dataBanner) {
            return res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND_BANNER,
            });
        } else {
            let data:any;
            if (req.file) {
                data = new Banner({
                    _id: paramId,
                    url: req.file.originalname,
                });
            }
            const banner = await BannerService.findAndUpdateBanner({ dataBanner }, data, {new: true});
            if (!banner) {
                return res.json({
                    status: status.NO_CONTENT,
                    message: message.UPDATE_BANNER_FAILS,
                });
            } else {
                return res.json({
                    data: banner,
                });
            }
        }
    }

    public static destroyBanner = async (req, res) => {
        const paramId = req.params.id;
        const dataBanner = await BannerService.getBanner(paramId);
        if (!dataBanner) {
            return res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND_BANNER,
            });
        } else {
            const banner = await BannerService.deleteBanner({ dataBanner });
            if (!banner) {
                return res.json({
                    status: status.NO_CONTENT,
                    message: message.DELETE_BANNER_FAILS,
                });
            } else {
                return res.json({
                    status: status.OK,
                    message: message.DELETE_BANNER_SUCCESS,
                });
            }
        }
    }
}