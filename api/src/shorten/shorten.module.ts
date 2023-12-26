import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortenSchema } from './infrastructure/database/mongoose/url-shorten.model';
import { UrlShortenController } from './infrastructure/web/api/url-shorten.controller';
import { MongooseUrlShortenRepository } from './infrastructure/database/mongoose/url-shorten.repository';
import { GenerateUrlShortenUseCase } from './domain/usecases/generate-url-shorten.use-case';
import {
  GetOriginalUrlAndIncrementCountingUseCase
} from './domain/usecases/get-original-url-and-increment-counting.use-case';
import { GetShortenUrlUseCase } from './domain/usecases/get-shorten-url.use-case';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/url_shortener'),
    MongooseModule.forFeature([
      { name: 'UrlShorten', schema: UrlShortenSchema },
    ]),
  ],
  controllers: [UrlShortenController],
  providers: [MongooseUrlShortenRepository, GenerateUrlShortenUseCase, GetOriginalUrlAndIncrementCountingUseCase, GetShortenUrlUseCase],
  exports: [MongooseUrlShortenRepository, GenerateUrlShortenUseCase, GetOriginalUrlAndIncrementCountingUseCase, GetShortenUrlUseCase],
})
export class ShortenModule {}
