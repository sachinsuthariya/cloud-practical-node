import { SqlUtils } from "../../../helpers/sqlUtils";
import { Tables } from "../../../config/tables";
import * as My from "jm-ez-mysql";

export class ProductUtils {
    public sqlUtils: SqlUtils = new SqlUtils();

    public createProduct(params) {
        return My.insert(Tables.PRODUCT, params)
    }

    // get list of product
    public getProductList(reqData) {
        try {            
            const field = ["product.productId as productId, product.name as name, product.price as price, product.SKU as SKU, STR_TO_DATE(product.createdAt, '%Y-%m-%d') as createdAt, cart.quantity as quantity, cart.userId as userId, cart.cartId as cartId"];

            let where = '1 = 1';
            where += reqData.regDate ? ` AND (DATE(createdAt) = '${reqData.regDate}')` : '';
            where += reqData.search ? ` AND (name LIKE '%${reqData.search}%')` : '';
            
            const order = `createdAt ${reqData.sort ? reqData.sort : 'ASC'}`;

            const table = `${Tables.PRODUCT} as product LEFT JOIN ${Tables.CART} as cart ON product.productId = cart.productId AND cart.userId = '${reqData.userId}'`;

            return this.sqlUtils.getListWithPagination(table, field, where, "product.productId", order, reqData);
        } catch (err) {                        
            return err;
        }
    }

    // update product by Id
    public updateProductDetails(details: Json, id: string) {
            delete details._user;
            return My.updateFirst(Tables.PRODUCT, details, "productId = ?", [id]);
    }

    // get product detail by id
    public getProductDetails(id: string) {
        return My.first(Tables.PRODUCT, ["productId, name, price, SKU, createdAt, updatedAt"], `productId = ?`, [id]);
    }

    public deleteProduct(id: string) {
        const where = "productId = ?";
        return My.delete(Tables.PRODUCT, where, [id]);
    }

}