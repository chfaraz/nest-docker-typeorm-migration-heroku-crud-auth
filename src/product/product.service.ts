import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '@src/product/dto/product.dto';
import { Product } from '@src/product/product.entity';
import { ProductRepository } from '@src/product/product.repository';
import { statusEnum } from './status.enum';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    try {
      await this.productRepository.save(product);
    } catch (err) {
      throw new NotFoundException('failed...');
    }
    return product;
  }

  async getProductById(id: string): Promise<Product> {
    const found = await this.productRepository.findOne({
      status: statusEnum.ACTIVE,
      id: id,
    });
    return found;
  }

  async updateProduct(id: string, { ...product }): Promise<Product> {
    console.log(product);

    await this.productRepository
      .createQueryBuilder('product')
      .update()
      .set({ ...product })
      .where('id = :id', { id: id })
      .execute();

    const found = await this.productRepository.findOne({
      id: id,
    });
    return found;
  }

  async delete(id: string): Promise<string> {
    const found = await this.productRepository
      .createQueryBuilder('product')
      .delete()
      .where('id = :id', { id: id })
      .execute();

    if (!found) {
      throw new NotFoundException('No Product found!');
    }
    return 'deleted successfully.';
  }
}
