import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortenSchema } from './infrastructure/database/mongoose/url-shorten.model';
import { UrlShortenController } from './infrastructure/web/api/url-shorten.controller';
import { MongooseUrlShortenRepository } from './infrastructure/database/mongoose/url-shorten.repository';
import { UrlShortenUseCase } from './domain/usecases/url-shorten.use-case';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/url_shortener'),
    MongooseModule.forFeature([
      { name: 'UrlShorten', schema: UrlShortenSchema },
    ]),
  ],
  controllers: [UrlShortenController],
  providers: [MongooseUrlShortenRepository, UrlShortenUseCase],
  exports: [MongooseUrlShortenRepository, UrlShortenUseCase],
})
export class ShortenModule {}
