import { Injectable } from '@nestjs/common';
import { MongooseUrlShortenRepository } from '../../infrastructure/database/mongoose/url-shorten.repository';
import { UrlShorten } from '../entities/url-shorten';
import { GetOriginalUrlAndIncrementCountingService } from '../../application/get-original-url-and-increment-counting.service';

@Injectable()
export class GetOriginalUrlAndIncrementCountingUseCase
  implements GetOriginalUrlAndIncrementCountingService
{
  constructor(
    private readonly urlShortenRepository: MongooseUrlShortenRepository,
  ) {}

  async incrementCountingAndRetrieveOriginalUrl(
    shortUrl: string,
  ): Promise<UrlShorten | null> {
    return await this.urlShortenRepository.findByShortUrlAndIncrement(shortUrl);
  }
}
