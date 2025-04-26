import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset, AssetDocument } from './schema/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ethers } from 'ethers';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<AssetDocument>,
    private readonly blockchainService: BlockchainService,
    
  ) {}

  async create(createAssetDto: CreateAssetDto, walletAddress: string): Promise<Asset> {
    const { images, appraisal, ownership } = createAssetDto;

    const asset = new this.assetModel({
      ...createAssetDto,
      owner: walletAddress,
      images,
      documents: {
        appraisal,
        ownership,
      },
    });

    return asset.save();
  }

  async findAll(): Promise<Asset[]> {
    return this.assetModel.find().exec();
  }

  async findOne(id: string): Promise<Asset> {
    const asset = await this.assetModel.findById(id).exec();
    if (!asset) throw new NotFoundException('Asset not found');
    return asset;
  }

  // async tokenize(id: string, walletAddress: string): Promise<string> {
  //   const asset = await this.findOne(id);
  //   if (!asset) throw new NotFoundException('Asset not found');

  //   // Interact with smart contract for tokenization
  //   return `Asset ${asset.name} has been tokenized!`;
  // }
  async tokenize(id: string, walletAddress: string): Promise<string> {
    const asset = await this.findOne(id);
    if (!asset) throw new NotFoundException('Asset not found');
  
    // Interact with smart contract for tokenization
    const tokenId = await this.blockchainService.createAsset(
      asset.name,
      asset.category,
      asset.totalTokens,
      ethers.parseUnits(asset.tokenPrice.toString(), 18),
      asset.yieldRate,
      asset.lockDuration,
      walletAddress,
    );
  
    // Optionally update your database asset to save the tokenId
    await this.update(id, { tokenId: tokenId.toString(), isTokenised: true });
  
    return `Asset ${asset.name} has been tokenized with tokenId ${tokenId}!`;
  }
  

  async getUserAssets(walletAddress: string): Promise<Asset[]> {
    return this.assetModel.find({ owner: walletAddress }).exec();
  }

  async getUserAssetById(id: string, walletAddress: string): Promise<Asset> {
    const asset = await this.findOne(id);
    if (asset.owner !== walletAddress) {
      throw new NotFoundException('Asset not found or you do not have permission to view it');
    }
    return asset;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.findOne(id);
    if (!asset) throw new NotFoundException('Asset not found');
    const updatedAsset = await this.assetModel.findByIdAndUpdate(id, updateAssetDto, { new: true }).exec();
    if (!updatedAsset) throw new NotFoundException('Asset not found');
    return updatedAsset;
  }

}
