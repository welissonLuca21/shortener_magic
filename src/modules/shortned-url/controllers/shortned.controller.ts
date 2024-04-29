import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { CreateShortnedUrlService } from '../services/create-shortned.service';
import { DeleteShortnedUrlService } from '../services/delete-shortned-url.service';
import { GetAllShortnedUrlService } from '../services/get-all-shortned-url.service';
import { GetShortnedUrlByIdService } from '../services/get-shortned-by-id.service';
import { RestoreShortnedUrlService } from '../services/restore-shortned.service';
import { UpdateShortnedUrlService } from '../services/update-shortned.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateShortnedUrlDto } from '@shared/database/dtos/create-shortned-url.dto';
import { GetLoggedUser } from '@shared/decorators/get-logged-user.decorator';
import { UserModel } from '@shared/database/models/user.model';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { CheckIsAdmin } from '@shared/decorators/check-is-admin.decorator';
import { IsAdmin } from '@shared/decorators/is-admin-endpoint.decorator';

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
  async createShortnedUrl(
    @Body() dto: CreateShortnedUrlDto,
    @GetLoggedUser() user: UserModel,
  ) {
    dto.userId = user?.id;
    return this.createShortnedUrlService.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @IsAdmin()
  @ApiOperation({
    summary: 'Get all shortned urls',
    operationId: 'getAllShortnedUrl',
  })
  @Get()
  async getAllShortnedUrl() {
    return this.getAllShortnedUrlService.execute();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete a shortned url',
    operationId: 'deleteShortnedUrl',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/delete')
  async deleteShortnedUrl(
    @Param('id') id: string,
    @GetLoggedUser() user: UserModel,
  ) {
    return this.deleteShortnedUrlService.execute(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Restore a shortned url',
    operationId: 'restoreShortnedUrl',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/restore')
  async restoreShortnedUrl(@Param('id') id: string, @GetLoggedUser() user: UserModel){
    return this.restoreShortnedService.execute(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update a shortned url',
    operationId: 'updateShortnedUrl',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/update')
  async updateShortnedUrl(
    @Param('id') id: string,
    @Body() { originalUrl }: { originalUrl: string },
    @GetLoggedUser() user: UserModel,
  ) {
    return this.updateShortnedUrlService.execute(id, originalUrl, user);
  }

  @ApiOperation({
    summary: 'Get a shortned url by id and redirect to the original url',
    operationId: 'getShortnedUrlById',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async getShortnedUrlById(@Param('id') id: string) {
    const { originalUrl } = await this.getShortnedUrlByIdService.execute(id);
    return { url: originalUrl };
  }
}
