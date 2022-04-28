import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  readonly price: number;
}
