import { Request, Response } from "express";
import { Constants } from "../../../config/constants";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { CartUtils } from "./cartUtils";
import { Utils } from "../../../helpers/utils"

export class CartController {
    private cartUtils: CartUtils = new CartUtils();

    // add to cart 
    public addToCart = async (req: any, res: Response) => {
        try {
            const userId = req.user.userId;
            
            let {
                productId,
                quantity,
                cartId
            } = req.body;
            if (cartId) {
                await this.cartUtils.manageCart({cartId, productId, userId, quantity})
            } else {
                cartId = Utils.genUUID();
                await this.cartUtils.addToCart({cartId, productId, userId, quantity})
            }
            let count = await this.cartUtils.getCartItemCount(userId);
            count = count && count.length ? count[0].count : 0;
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS"), { count });
            return res.status(response.code).json(response);
        } catch(err) {                        
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }

        // remove from cart 
        public removeItemFromCart = async (req: any, res: Response) => {
            try {
                const cartId = req.params.id;
                const userId = req.user.userId;
                await this.cartUtils.removeItemFromCart(cartId);
                let count = await this.cartUtils.getCartItemCount(userId);
                count = count && count.length ? count[0].count : 0;
                const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS_CART_DELETE"), { count });
                return res.status(response.code).json(response);
            } catch(err) {
                const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
                return res.status(response.error.code).json(response);
            }
        }

        // remove from cart 
        public updateCart = async (req: any, res: Response) => {
            try {
                const cartId = req.params.id;
                const userId = req.user.userId;                
                
                const quantity = req.body && req.body.quantity && req.body.quantity > 0 ? req.body.quantity : 0; 
                
                await this.cartUtils.updateCart(cartId, { quantity });
                let count = await this.cartUtils.getCartItemCount(userId); 
                               
                count = count && count.length ? count[0].count : 0;

                const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS"), {count});
                return res.status(response.code).json(response);
            } catch(err) {
                const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
                return res.status(response.error.code).json(response);
            }
        }


        // remove from cart 
        public getCartItems = async (req: any, res: Response) => {
            try {
                const userId = req.user.userId;

                const data = await this.cartUtils.getCartItems(userId);
                let count = await this.cartUtils.getCartItemCount(userId);
                count = count && count.length ? count[0].count : 0;
                const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS"), {items: data, count});
                return res.status(response.code).json(response);
            } catch(err) {                
                const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
                return res.status(response.error.code).json(response);
            }
        }

}  