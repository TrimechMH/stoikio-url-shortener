import { Injectable } from '@nestjs/common';
import { MongooseUrlShortenRepository } from '../../infrastructure/database/mongoose/url-shorten.repository';
import { UrlShorten } from '../entities/url-shorten';
import { GetShortenUrlService } from '../../application/get-shorten-url.service';

@Injectable()
export class GetShortenUrlUseCase implements GetShortenUrlService {
    constructor(
        private readonly urlShortenRepository: MongooseUrlShortenRepository,
    ) {}

    async getShortenUrl(shortUrl: string): Promise<UrlShorten | null> {
        return await this.urlShortenRepository.findByShortUrl(shortUrl);
    }
}