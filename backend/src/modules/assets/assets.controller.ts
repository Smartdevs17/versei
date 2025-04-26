import { Controller, Get, Post, Body, Param, UseGuards, Request, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/framework/response/response.service';
import { UpdateAssetDto } from './dto/update-asset.dto';

@ApiTags('Assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly responseService: ResponseService
  ) {}

  @Get()
  async findAll() {
      const result = await this.assetsService.findAll();
      return this.responseService.success({ data: result, message: 'Assets retrieved successfully' });
  }

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto, @Request() req) {
      const result = await this.assetsService.create(createAssetDto, req.user.walletAddress);
      return this.responseService.success({ data: result, message: 'Asset created successfully' });
  }

  @Post(':id/tokenize')
  async tokenize(@Param('id') id: string, @Request() req) {
      const result = await this.assetsService.tokenize(id, req.user.walletAddress);
      return this.responseService.success({ data: result, message: 'Asset tokenized successfully' });
  }

  @Get('user-assets')
  async getUserAssets(@Request() req) {
    try {
      const result = await this.assetsService.getUserAssets(req.user.walletAddress);
      return this.responseService.success({ data: result, message: 'User assets retrieved successfully' });
    } catch (error) {
      return this.responseService.error({ message: 'Failed to retrieve user assets', errors: error.message });
    }
  }

  @Get('user-assets/:id')
  async getUserAssetById(@Param('id') id: string, @Request() req) {
      const result = await this.assetsService.getUserAssetById(id, req.user.walletAddress);
      if (!result) {
        return this.responseService.error({ message: 'Asset not found', errors: 'No asset found with the provided ID', code: 404 });
      }
      if (result.owner !== req.user.walletAddress) {
        return this.responseService.error({ message: 'Unauthorized', errors: 'You do not own this asset', code: 403 });
      }
      return this.responseService.success({ data: result, message: 'User asset retrieved successfully' });
    } 

  @Get('user-assets/:id/tokenize')
  async getUserAssetTokenize(@Param('id') id: string, @Request() req) {
      const result = await this.assetsService.tokenize(id, req.user.walletAddress);
      return this.responseService.success({ data: result, message: 'User asset tokenized successfully' });

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
      const result = await this.assetsService.update(id, updateAssetDto);
      return this.responseService.success({ data: result, message: 'Asset updated successfully' });
  }

    // GET /api/assets/:id.json
  @Get(':id.json')
  async getAssetMetadata(@Param('id') id: string) {
    const asset = await this.assetsService.findOne(id);
    return {
      name: asset.name,
      description: `A tokenized ${asset.category} asset`,
      image: asset.images?.[0] ?? '', // Use the first image or fallback to empty string
      attributes: [
        { trait_type: 'Category', value: asset.category },
        { trait_type: 'Yield Rate', value: asset.yieldRate },
        { trait_type: 'Total Tokens', value: asset.totalTokens.toString() },
        { trait_type: 'Token Price', value: `$${asset.tokenPrice}` }
      ]
    };
}

@Get(':id')
async findOne(@Param('id') id: string) {
    const result = await this.assetsService.findOne(id);
    return this.responseService.success({ data: result, message: 'Asset retrieved successfully' });

}



  } 