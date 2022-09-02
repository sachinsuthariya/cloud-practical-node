import { Request, Response } from "express";
import { Constants } from "../../../config/constants";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Utils } from "../../../helpers/utils";
import { ProductUtils } from "./productUtils";

export class ProductController {
    private productUtils: ProductUtils = new ProductUtils();

    public createProduct = async (req: any, res: Response) => {
        try {
            const productId = Utils.genUUID()
            const {
                name,
                price,
                SKU,
            } = req.body;

            const data = {
                productId,
                name,
                price,
                SKU,
            };

            await this.productUtils.createProduct(data);
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("PRODUCT_CREATE_SUCCESS"), data);
            return res.status(response.code).json(response);
        }catch (err) {
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }

    // get plan list
    public getProductList = async (req: any, res: Response) => {
        try {

            req.query.userId = req.user.userId;
            const data = await this.productUtils.getProductList(req.query);

            if (data && data.list.length) {
                const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS"), data);
                return res.status(response.code).json(response);
            }
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("NO_DATA_FOUND"));
            return res.status(response.code).json(response);
        } catch (err) {            
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }

    // update plan status & detail
    public updateProduct = async (req: any, res: Response) => {
        try {
            const productId = req.params.productId;
            await this.productUtils.updateProductDetails(req.body, productId);
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS_UPDATE"));
            return res.status(response.code).json(response);
        } catch (err) {
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }

    // get plan detail
    public getProductDetail = async (req: any, res: Response) => {
        try {
            const data = await this.productUtils.getProductDetails(req.params.productId);
            
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS"), data);
            return res.status(response.code).json(response);
        } catch (err) {
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }

    // delete plan
    public deleteProduct = async (req: any, res: Response) => {
        try {
            const productId = req.params.productId;
            
            await this.productUtils.deleteProduct(productId);
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS_DELETE"), req.user);
            return res.status(response.code).json(response);
        } catch (err) {
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }
}  