import { CustomerService } from '../services/CutomerService';
import { message, status } from '../config/constant';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export class CustomerController {
    public static getAllCutomer = async (req, res) => {
        const customerAll = await CustomerService.getAllCutomer();
        return res.json({
            data: customerAll,
            status: status.OK,
        });
    }

    public static getCustomerById = async (req, res) => {
        const id = req.params.id;
        const customer = await CustomerService.getCutomer(id);
        if (!customer) {
            return res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND,
            });
        } else {
            return res.json({
                data: customer,
                status: status.OK,
            });
        }
    }

    public static createCutomer = async (req, res) => {
        const newCutomer = req.body;
        const customer = await CustomerService.createCutomer(newCutomer);
        if (!customer) {
            return res.json({
                status: status.BAD_REQUEST,
                message: message.CREATED_CUSTOMER_FAILS,
            });
        } else {
            return res.json({
                status: status.CREATED_SUCCESS,
                data: customer,
            });
        }
    }

    public static updateCustomer = async (req, res) => {
        const paramId = req.params.id;
        const dataBanner = await CustomerService.getCutomer(paramId);
        if (!dataBanner) {
            return res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND,
            });
        } else {
            const data = req.body;
            const customer = await CustomerService.findAndUpdateCutomer({ dataBanner }, data, {new: true});
            if (!customer) {
                return res.json({
                    status: status.NO_CONTENT,
                    message: message.UPDATE_CUSTOMER_FAILS,
                });
            } else {
                return res.json({
                    data: customer,
                });
            }
        }
    }

    public static destroyCustomer = async (req, res) => {
        const paramId = req.params.id;
        const dataCustomer = await CustomerService.getCutomer(paramId);
        if (!dataCustomer) {
            return res.json({
                status: status.NOT_FOUND,
                message: message.NOT_FOUND,
            });
        } else {
            const customer = await CustomerService.deleteCutomer({ dataCustomer });
            if (!customer) {
                return res.json({
                    status: status.NO_CONTENT,
                    message: message.DELETE_CUSTOMER_FAILS,
                });
            } else {
                return res.json({
                    status: status.OK,
                    message: message.DELETE_CUSTOMER_SUCCESS,
                });
            }
        }
    }
}