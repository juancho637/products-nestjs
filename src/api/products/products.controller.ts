import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductSerializer } from './product.serializer';
import { Product } from './schemas/product.schema';
import MongooseClassSerializerInterceptor from './interceptors/mongooseClassSerializer.interceptor';

@Controller('api/v1/products')
@UseInterceptors(MongooseClassSerializerInterceptor(ProductSerializer))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const user = req.user;

    return await this.productsService.create(user, createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const user = req.user;

    return await this.productsService.update(user, id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req, @Param('id') id: string): Promise<Product> {
    const user = req.user;

    return await this.productsService.remove(user, id);
  }
}
