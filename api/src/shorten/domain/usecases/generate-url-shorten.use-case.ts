import { nanoid } from 'nanoid';
import { Injectable } from '@nestjs/common';
import { MongooseUrlShortenRepository } from '../../infrastructure/database/mongoose/url-shorten.repository';
import { UrlShorten } from '../entities/url-shorten';
import { UrlShortenDto } from '../../application/url-shorten.dto';
import { GenerateUrlShortenService } from '../../application/generate-url-shorten.service';

const LENGTH_OF_SHORTEN_GENERATED_STRING = 5;

@Injectable()
export class GenerateUrlShortenUseCase implements GenerateUrlShortenService {
    constructor(
        private readonly urlShortenRepository: MongooseUrlShortenRepository,
    ) {}

    async generateShortenUrl(urlShortenDto: UrlShortenDto): Promise<UrlShorten> {
        const { originalUrl } = urlShortenDto;
        const alreadyExistingOriginalUrl =
            await this.urlShortenRepository.findByOriginalUrl(originalUrl);
        if (alreadyExistingOriginalUrl) {
            return new UrlShorten(
                alreadyExistingOriginalUrl.originalUrl,
                alreadyExistingOriginalUrl.shortUrl,
            );
        }
        //@TODO check if create nanoid already exist mean the couple nanoid & originalUrl (unique true is enough)
        const shortUrl = nanoid(LENGTH_OF_SHORTEN_GENERATED_STRING);
        const shortenedUrl = new UrlShorten(originalUrl, shortUrl);
        await this.urlShortenRepository.save(shortenedUrl);
        return shortenedUrl;
    }
}
