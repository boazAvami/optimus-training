import { OrderProductDto } from "./order-product.dto";
import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductInOrderDto extends OrderProductDto {
    @ApiProperty({ example: 1, description: 'ID of the Order to update' })
    @IsNumber()
    orderId: number;
}