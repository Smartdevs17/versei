import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schema/asset.schema';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { ResponseService } from 'src/framework/response/response.service';
import { BlockchainService } from '../blockchain/blockchain.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }])],
  controllers: [AssetsController],
  providers: [AssetsService, ResponseService, BlockchainService],
  exports: [AssetsService],
})
export class AssetsModule {}
