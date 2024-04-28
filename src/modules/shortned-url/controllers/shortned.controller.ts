import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateShortnedUrlService } from '../services/create-shortned.service';
import { DeleteShortnedUrlService } from '../services/delete-shortned-url.service';
import { GetAllShortnedUrlService } from '../services/get-all-shortned-url.service';
import { GetShortnedUrlByIdService } from '../services/get-shortned-by-id.service';
import { RestoreShortnedUrlService } from '../services/restore-shortned.service';
import { UpdateShortnedUrlService } from '../services/update-shortned.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateShortnedUrlDto } from '@shared/database/dtos/create-shortned-url.dto';

@ApiBearerAuth()
@ApiTags('Shortned Url')
@Controller('shortned')
export class ShortnedController {
  constructor(
    private readonly restoreShortnedService: RestoreShortnedUrlService,
    private readonly createShortnedUrlService: CreateShortnedUrlService,
    private readonly getAllShortnedUrlService: GetAllShortnedUrlService,
    private readonly deleteShortnedUrlService: DeleteShortnedUrlService,
    private readonly updateShortnedUrlService: UpdateShortnedUrlService,
    private readonly getShortnedUrlByIdService: GetShortnedUrlByIdService,
  ) {}

  @ApiOperation({
    summary: 'Create a shortned url',
    operationId: 'createShortnedUrl',
  })
  @ApiBody({
    type: CreateShortnedUrlDto,
  })
  @Post()
  async createShortnedUrl(@Body() dto: CreateShortnedUrlDto) {
    return this.createShortnedUrlService.execute(dto);
  }

  @ApiOperation({
    summary: 'Get all shortned urls',
    operationId: 'getAllShortnedUrl',
  })
  @Get()
  async getAllShortnedUrl() {
    return this.getAllShortnedUrlService.execute();
  }

  @ApiOperation({
    summary: 'Delete a shortned url',
    operationId: 'deleteShortnedUrl',
  })
  @Post(':id/delete')
  async deleteShortnedUrl(id: string) {
    return this.deleteShortnedUrlService.execute(id);
  }

  @ApiOperation({
    summary: 'Restore a shortned url',
    operationId: 'restoreShortnedUrl',
  })
  @Post(':id/restore')
  async restoreShortnedUrl(id: string) {
    return this.restoreShortnedService.execute(id);
  }

  @ApiOperation({
    summary: 'Update a shortned url',
    operationId: 'updateShortnedUrl',
  })
  @Post(':id/update')
  async updateShortnedUrl(
    id: string,
    { originalUrl }: { originalUrl: string },
  ) {
    return this.updateShortnedUrlService.execute(id, originalUrl);
  }

  @ApiOperation({
    summary: 'Get a shortned url by id',
    operationId: 'getShortnedUrlById',
  })
  @Get(':id')
  async getShortnedUrlById(id: string) {
    return this.getShortnedUrlByIdService.execute(id);
  }
}
