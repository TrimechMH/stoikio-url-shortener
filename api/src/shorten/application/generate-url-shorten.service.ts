import { UrlShorten } from '../domain/entities/url-shorten';
import { UrlShortenDto } from './url-shorten.dto';

export interface GenerateUrlShortenService {
  generateShortenUrl(shortenUrlDto: UrlShortenDto): Promise<UrlShorten>;
}
