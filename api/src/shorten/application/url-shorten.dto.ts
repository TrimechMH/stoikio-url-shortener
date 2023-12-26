import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UrlShortenDto {
  @ApiProperty({
    example:
      'https://medium.com/equify-tech/the-three-fundamental-stages-of-an-engineering-career-54dac732fc74',
    required: true,
  })
  @IsString()
  @IsUrl({}, { message: 'Invalid URL' })
  readonly originalUrl: string;
}
