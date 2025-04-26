import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ethers } from 'ethers';
import { VerseiAsset, VerseiAsset__factory } from '../../hardhat/typechain-types'; // Adjust based on your setup
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: VerseiAsset;

  constructor() {
    // Initialize with chain ID to prevent ENS resolution
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL, {
      chainId: parseInt(process.env.CHAIN_ID || "31337"), // Default to Hardhat
      name: "local" // Prevents ENS resolution
    });
    
    this.signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
    
    // Convert owner address to prevent ENS resolution attempts
    const contractAddress = ethers.getAddress(process.env.VERSEI_ASSET_ADDRESS);
    this.contract = VerseiAsset__factory.connect(contractAddress, this.signer);
  }

  // Helper to ensure addresses don't trigger ENS resolution
  private async resolveAddress(input: string): Promise<string> {
    if (ethers.isAddress(input)) {
      return ethers.getAddress(input);
    }
    throw new Error("ENS resolution not supported on this network");
  }

  async createAsset(
    name: string,
    category: string,
    totalTokens: number | string | bigint | { $numberDecimal: string } | null,
    tokenPrice: number | string | bigint | { $numberDecimal: string } | null,
    yieldRate: string,
    lockDuration: number,
    owner: string,
  ): Promise<number> {
    try {
      // Convert and validate numeric inputs
      const tokensBigInt = this.validateAndConvertToBigInt(totalTokens, 'totalTokens');
      const priceBigInt = this.validateAndConvertToBigInt(tokenPrice, 'tokenPrice');
  
      const ownerAddress = await this.resolveAddress(owner);
      
      const tx = await this.contract.createAsset(
        name,
        category,
        tokensBigInt,
        priceBigInt,
        yieldRate,
        lockDuration,
        ownerAddress
      );
      
      const receipt = await tx.wait();
      
      const event = receipt.logs.find((log) => {
        try {
          return this.contract.interface.parseLog(log)?.name === 'AssetCreated';
        } catch {
          return false;
        }
      });
      
      if (!event) throw new Error('AssetCreated event not found');
      return Number(this.contract.interface.parseLog(event).args.tokenId);
    } catch (error) {
      console.error('BlockchainService.createAsset error:', error);
      throw new InternalServerErrorException(
        error.reason || error.shortMessage || 'Failed to create asset'
      );
    }
  }
  
  private validateAndConvertToBigInt(
    value: number | string | bigint | { $numberDecimal: string } | null,
    paramName: string
  ): bigint {
    if (value === null || value === undefined) {
      throw new Error(`${paramName} cannot be null or undefined`);
    }
  
    try {
      if (typeof value === 'object' && '$numberDecimal' in value) {
        return BigInt(value.$numberDecimal);
      }
      return BigInt(value);
    } catch (e) {
      throw new Error(`Invalid ${paramName} value: ${value}`);
    }
  }
  async verifyAsset(tokenId: number) {
    try {
      const tx = await this.contract.verifyAsset(tokenId);
      await tx.wait();
    } catch (error) {
      console.error('BlockchainService.verifyAsset error:', error);
      throw new InternalServerErrorException('Failed to verify asset');
    }
  }

  async distributeProfit(tokenId: number, amount: bigint) {
    try {
      const tx = await this.contract.distributeProfit(tokenId, amount);
      await tx.wait();
    } catch (error) {
      console.error('BlockchainService.distributeProfit error:', error);
      throw new InternalServerErrorException('Failed to distribute profit');
    }
  }

  async setBaseURI(newBaseURI: string) {
    try {
      const tx = await this.contract.setBaseURI(newBaseURI);
      await tx.wait();
    } catch (error) {
      console.error('BlockchainService.setBaseURI error:', error);
      throw new InternalServerErrorException('Failed to set base URI');
    }
  }
}
