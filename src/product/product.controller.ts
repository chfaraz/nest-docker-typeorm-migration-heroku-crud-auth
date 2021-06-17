import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { CreateProductDto } from '@src/product/dto/product.dto';
import { Product } from '@src/product/product.entity';
import { ProductService } from '@src/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProductById(@Param('id') id: string): Promise<string> {
    return this.productService.delete(id);
  }
  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    console.log(id);

    return this.productService.getProductById(id);
  }

  @Get('/')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { ...product },
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }
}
