import { SqlUtils } from "../../../helpers/sqlUtils";
import { Tables } from "../../../config/tables";
import * as My from "jm-ez-mysql";
import { Utils } from "../../../helpers/utils";

export class CartUtils {
    public sqlUtils: SqlUtils = new SqlUtils();

    public addToCart(params: any) {
        return My.insert(Tables.CART, params);
    }

    public async manageCart(params: any) {        
            const product = await My.first(Tables.CART, ['cartId, productId, userId, quantity'], `cartId = ? AND productId = ? AND userId = ?`, [params.cartId, params.productId, params.userId]);
            const quantity = product && product.quantity ? (product.quantity + 1) : 1;
            return this.updateCart(params.cartId, {quantity})
    }  

    public removeItemFromCart(id: string) {
        const where = 'cartId = ?'
        return My.delete(Tables.CART, where, [id]);
    }

    public async updateCart(id: string, details: any) {
        delete details._user;
        const res = await My.updateFirst(Tables.CART, details, "cartId = ?", [id]);
        console.log('res =>', My.lQ);
        console.log('res =>', res);
        return res
    }

    public getCartItems(userId: string) {
        const fields = `cart.cartId as cartId, cart.userId as userId, cart.productId as productId, product.name as name, product.SKU as SKU, product.price as price, cart.quantity as quantity`;
        const model = `SELECT ${fields} FROM ${Tables.CART} AS cart 
        LEFT JOIN ${Tables.PRODUCT} AS product ON product.productId = cart.productId`;
        const cond = `cart.userId = '${userId}'`
        const query = `${model} WHERE ${cond}`;

        return My.query(query);
    }

    public getCartItemCount(userId: string) {
       const fields = `SUM(cart.quantity) as count`;
       const model = `SELECT ${fields} FROM ${Tables.CART}`;
       const cond = `cart.userId = '${userId}'`;
       const query = `${model} WHERE ${cond}`;

       return My.query(query);
    }

}