import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  Header,
} from '@nestjs/common';
import { UrlShortenDto } from '../../../application/url-shorten.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenerateUrlShortenUseCase } from '../../../domain/usecases/generate-url-shorten.use-case';
import { GetOriginalUrlAndIncrementCountingUseCase } from '../../../domain/usecases/get-original-url-and-increment-counting.use-case';
import { GetShortenUrlUseCase } from '../../../domain/usecases/get-shorten-url.use-case';

@Controller()
export class UrlShortenController {
  constructor(
    private readonly generateUrlShortenUseCase: GenerateUrlShortenUseCase,
    private readonly getOriginalUrlAndIncrementCountingUseCase: GetOriginalUrlAndIncrementCountingUseCase,
    private readonly getShortenUrlUseCase: GetShortenUrlUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a shorten url' })
  @ApiResponse({
    status: 201,
    description: 'The shorten url has been successfully created.',
  })
  @ApiBody({ type: UrlShortenDto })
  async shortenUrl(@Body() shortenUrlDto: UrlShortenDto) {
    const shortenedUrl =
      await this.generateUrlShortenUseCase.generateShortenUrl(shortenUrlDto);
    return { shortUrl: shortenedUrl.shortUrl };
  }

  @Get(':shortUrl')
  @ApiOperation({ summary: 'Redirect to original url from a shorten code' })
  @ApiResponse({
    status: HttpStatus.MOVED_PERMANENTLY,
    description: 'Redirect to original url from a shorten code',
  })
  @Header('Cache-Control', 'no-store')
  async getUrl(@Param('shortUrl') shortUrl: string, @Res() res) {
    const urlShorten =
      await this.getOriginalUrlAndIncrementCountingUseCase.incrementCountingAndRetrieveOriginalUrl(
        shortUrl,
      );
    if (!urlShorten) {
      throw new NotFoundException('URL not found: can be expired');
    }
    res.redirect(HttpStatus.MOVED_PERMANENTLY, urlShorten.originalUrl);
  }

  @Get(':shortUrl/statistics')
  @ApiOperation({ summary: 'Get shorten url statistics information' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get shorten url statistics information',
  })
  async getStatisticsUrl(@Param('shortUrl') shortUrl: string) {
    const urlShorten = await this.getShortenUrlUseCase.getShortenUrl(shortUrl);
    if (!urlShorten) {
      throw new NotFoundException('URL not found: can be expired');
    }
    return urlShorten;
  }
}
