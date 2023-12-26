import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlShorten } from '../../../domain/entities/url-shorten';
import { UrlShortenRepository } from '../../../domain/interfaces/url-shorten.repository';

@Injectable()
export class MongooseUrlShortenRepository implements UrlShortenRepository {
  constructor(
    @InjectModel('UrlShorten')
    private readonly shortUrlModel: Model<UrlShorten>,
  ) {}

  async save(url: UrlShorten): Promise<void> {
    const shortUrlModel = new this.shortUrlModel(url);
    await shortUrlModel.save();
  }

  async findByShortUrl(shortUrl: string): Promise<UrlShorten | null> {
    return this.shortUrlModel.findOne({ shortUrl }).exec();
  }

  async findByShortUrlAndIncrement(
    shortUrl: string,
  ): Promise<UrlShorten | null> {
    return this.shortUrlModel
      .findOneAndUpdate({ shortUrl }, { $inc: { count: 1 } })
      .exec();
  }

  async findByOriginalUrl(originalUrl: string): Promise<UrlShorten | null> {
    return this.shortUrlModel.findOne({ originalUrl }).exec();
  }
}
