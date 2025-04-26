import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Signer } from "ethers";
import { VerseiAsset } from "../typechain-types";

describe("VerseiAsset", function () {
  let owner: Signer, user: Signer, otherAccount: Signer;
  let verseiAsset: VerseiAsset;
  const lockDuration = 60 * 60 * 24 * 30; // 30 days in seconds
  const initialTokens = 1000;
  const tokenPrice = ethers.parseUnits("1", 18); // 1 token costs 1 unit (in wei)
  const yieldRate = "5%";
  const baseURI = "http://localhost:3000/api/assets/";

  beforeEach(async () => {
    [owner, user, otherAccount] = await ethers.getSigners();

    // Deploy the contract
    [owner, user] = await ethers.getSigners();
    const VerseiAsset = await ethers.getContractFactory("VerseiAsset");
    verseiAsset = await VerseiAsset.deploy();
});

  describe("Deployment", function () {
    it("Should deploy the contract and assign the owner", async function () {
      expect(await verseiAsset.owner()).to.equal(await owner.getAddress());
    });
  });

describe("Asset Creation", function () {
    it("Should create an asset and mint tokens", async function () {
        // Create the asset
        const tx = await verseiAsset.createAsset(
          "Tokenized Asset",
          "Real Estate",
          initialTokens,
          tokenPrice,
          yieldRate,
          lockDuration,
          await owner.getAddress()
        );
        
        // Wait for transaction and get the receipt
        const receipt = await tx.wait();
        console.log("Transaction Hash:", tx.hash); 
        
        // Find the event in the logs (new Ethers.js v6 syntax)
        const event = receipt?.logs?.find(log => {
          try {
            return verseiAsset.interface.parseLog(log)?.name === "AssetCreated";
          } catch {
            return false;
          }
        });
        
        // Ensure event was found
        if (!event) {
          throw new Error("AssetCreated event not found");
        }
        
        // Parse the event
        const parsedEvent = verseiAsset.interface.parseLog(event);
        const tokenId = parsedEvent?.args.tokenId;
        
        // Verify the asset
        const asset = await verseiAsset.assets(tokenId);
        expect(asset.name).to.equal("Tokenized Asset");
        expect(asset.totalTokens).to.equal(initialTokens);
      });
});

  describe("Asset Verification", function () {
    it("Should allow owner to verify an asset", async function () {
        // Create the asset first
        const createTx = await verseiAsset.createAsset(
          "Tokenized Asset",
          "Real Estate",
          initialTokens,
          tokenPrice,
          yieldRate,
          lockDuration,
          await owner.getAddress()
        );
        
        // Get the tokenId from transaction logs
        const createReceipt = await createTx.wait();
        const createLog = createReceipt?.logs?.find(log => {
          try {
            return verseiAsset.interface.parseLog(log)?.name === "AssetCreated";
          } catch {
            return false;
          }
        });
        
        if (!createLog) throw new Error("AssetCreated event not found");
        const parsedEvent = verseiAsset.interface.parseLog(createLog);
        const tokenId = parsedEvent?.args.tokenId;
      
        // Verify the asset and check for event
        const verifyTx = await verseiAsset.verifyAsset(tokenId);
        
        // Check both the event emission and the state change
        await expect(verifyTx)
          .to.emit(verseiAsset, "AssetVerified")  // Note: Your contract emits "ProfitDistributed" but not "AssetVerified"
          .withArgs(tokenId);
      
        // Verify the state was updated
        const asset = await verseiAsset.assets(tokenId);
        expect(asset.verified).to.equal(true);
      });
  });

  describe("Profit Distribution", function () {
    it("Should allow owner to distribute profits", async function () {
        // 1. Create the asset
        const createTx = await verseiAsset.createAsset(
          "Tokenized Asset",
          "Real Estate",
          initialTokens,
          tokenPrice,
          yieldRate,
          lockDuration,
          await owner.getAddress()
        );
        
        // 2. Get the tokenId from transaction logs (Ethers.js v6 style)
        const createReceipt = await createTx.wait();
        const createEvent = createReceipt?.logs?.find(log => {
          try {
            const parsed = verseiAsset.interface.parseLog(log);
            return parsed?.name === "AssetCreated";
          } catch {
            return false;
          }
        });
        
        if (!createEvent) throw new Error("AssetCreated event not found");
        const parsedEvent = verseiAsset.interface.parseLog(createEvent);
        const tokenId = parsedEvent?.args.tokenId;      
        // 3. Prepare profit amount (modern Ethers.js syntax)
        const profitAmount = ethers.parseEther("100"); // Changed from ethers.utils.parseEther
      
        // 4. Test profit distribution
        await expect(verseiAsset.distributeProfit(tokenId, profitAmount))
          .to.emit(verseiAsset, "ProfitDistributed")
          .withArgs(tokenId, profitAmount);
      
        // 5. Optional: Verify the profit pool was updated
        const poolAmount = await verseiAsset.profitPools(tokenId);
        expect(poolAmount).to.equal(profitAmount);
      });
  });

  describe("Profit Claiming", function () {
    it("Should allow users to claim profits after lock duration", async function () {
        // 1. Create asset
        const createTx = await verseiAsset.createAsset(
            "Tokenized Asset",
            "Real Estate",
            initialTokens,
            tokenPrice,
            yieldRate,
            lockDuration,
            await owner.getAddress()
        );
        const createReceipt = await createTx.wait();
        
        // 2. Get tokenId
        const createEvent = createReceipt?.logs?.find(log => 
            verseiAsset.interface.parseLog(log)?.name === "AssetCreated"
        );
        if (!createEvent) throw new Error("AssetCreated event not found");
        const parsedEvent = verseiAsset.interface.parseLog(createEvent);
        const tokenId = parsedEvent?.args.tokenId;   

        // 3. Fund the contract
        const profitAmount = ethers.parseEther("1");
        await owner.sendTransaction({
            to: await verseiAsset.getAddress(),
            value: profitAmount
        });
        
        // 4. Distribute profits
        await verseiAsset.distributeProfit(tokenId, profitAmount);
        
        // 5. Transfer tokens to user
        const transferAmount = 100;
        await verseiAsset.safeTransferFrom(
            owner.getAddress(),
            user.getAddress(),
            tokenId,
            transferAmount,
            "0x"
        );
        
        // 6. Fast-forward time
        await network.provider.send("evm_increaseTime", [lockDuration + 1]);
        await network.provider.send("evm_mine", []);
        
        // 7. Get total supply - using explicit function signature
        const totalSupply = await verseiAsset["totalSupply(uint256)"](tokenId);
        
        // 8. Calculate expected share
        const expectedShare = (profitAmount * BigInt(transferAmount)) / BigInt(totalSupply);
        console.log(`Expected Shares: ${expectedShare}`)
        
        // 9. Claim and verify
        await expect(verseiAsset.connect(user).claimProfit(tokenId))
            .to.emit(verseiAsset, "ProfitClaimed")
            .withArgs(tokenId, await user.getAddress(), expectedShare);
        
        // 10. Verify profit pool decreased
        const remainingPool = await verseiAsset.profitPools(tokenId);
        expect(remainingPool).to.equal(profitAmount - expectedShare);
    });
  });

  describe("Buying Assets", function () {
    it("Should allow users to buy assets", async function () {
        // 1. Create asset
        const createTx = await verseiAsset.createAsset(
          "Tokenized Asset",
          "Real Estate",
          initialTokens,
          tokenPrice,
          yieldRate,
          lockDuration,
          owner.getAddress()
        );
        const createReceipt = await createTx.wait();
        
        // 2. Get tokenId from logs
        const createEvent = createReceipt?.logs?.find(log => {
          try {
            return verseiAsset.interface.parseLog(log)?.name === "AssetCreated";
          } catch {
            return false;
          }
        });
        if (!createEvent) throw new Error("AssetCreated event not found");
        const parsedEvent = verseiAsset.interface.parseLog(createEvent);
        const tokenId = parsedEvent?.args.tokenId;   

        // 3. Verify asset first (since buyAsset requires verification)
        await verseiAsset.verifyAsset(tokenId);
      
        // 4. Prepare purchase
        const quantity = 5;
        const totalPrice = tokenPrice * BigInt(quantity); // Ethers v6 uses BigInt
      
        // 5. Execute and verify purchase
        await expect(
          verseiAsset.connect(user).buyAsset(tokenId, quantity, {
            value: totalPrice
          })
        )
          .to.emit(verseiAsset, "AssetBought")
          .withArgs(tokenId, user.getAddress(), quantity, totalPrice);
      
        // 6. Verify token balance
        const userBalance = await verseiAsset.balanceOf(user.getAddress(), tokenId);
        expect(userBalance).to.equal(quantity);
      
        // 7. Verify total supply remains correct
        const newTotalSupply = await verseiAsset["totalSupply(uint256)"](tokenId);
        expect(newTotalSupply).to.equal(initialTokens + quantity); // Assuming the contract mints new tokens
      });
  });

  describe("Selling Assets", function () {
    it("Should allow users to sell assets after lock period", async function () {
        // 1. Create asset
        const createTx = await verseiAsset.createAsset(
          "Tokenized Asset",
          "Real Estate",
          initialTokens,
          tokenPrice,
          yieldRate,
          lockDuration,
          owner.getAddress()
        );
        const createReceipt = await createTx.wait();
      
        // 2. Get tokenId from logs
        const createEvent = createReceipt?.logs?.find(log => {
          try {
            return verseiAsset.interface.parseLog(log)?.name === "AssetCreated";
          } catch {
            return false;
          }
        });
        if (!createEvent) throw new Error("AssetCreated event not found");
        const parsedEvent = verseiAsset.interface.parseLog(createEvent);
        const tokenId = parsedEvent?.args.tokenId;  

        // 3. Verify asset (if required by your contract)
        await verseiAsset.verifyAsset(tokenId);
      
        // 4. User buys tokens
        const quantity = 5;
        const totalPrice = tokenPrice * BigInt(quantity);
        
        // Fund contract with enough ETH for future refund
        await owner.sendTransaction({
          to: await verseiAsset.getAddress(),
          value: totalPrice * 2n
        });
      
        await verseiAsset.connect(user).buyAsset(tokenId, quantity, {
          value: totalPrice
        });
      
        // 5. Fast-forward time past lock period
        await network.provider.send("evm_increaseTime", [lockDuration + 1]);
        await network.provider.send("evm_mine", []);
      
        // 6. Get initial balances for verification
        const userBalanceBefore = await verseiAsset.balanceOf(user.getAddress(), tokenId);
        const contractEthBefore = await ethers.provider.getBalance(await verseiAsset.getAddress());
        const userEthBefore = await ethers.provider.getBalance(user.getAddress());
      
        // 7. Execute sell transaction
        const sellTx = await verseiAsset.connect(user).sellAsset(tokenId, quantity);
        await expect(sellTx)
          .to.emit(verseiAsset, "AssetSold")
          .withArgs(tokenId, user.getAddress(), quantity, totalPrice);
      
        // 8. Verify token balance
        const quantityBigInt = BigInt(quantity); // Convert quantity to BigInt
        const userBalanceAfter = await verseiAsset.balanceOf(user.getAddress(), tokenId);
        expect(userBalanceAfter).to.equal(userBalanceBefore - quantityBigInt);
      
        // 9. Verify ETH was refunded
        const userEthAfter = await ethers.provider.getBalance(user.getAddress());
        expect(userEthAfter).to.be.gt(userEthBefore);
      
        // 10. Verify contract ETH balance decreased
        const contractEthAfter = await ethers.provider.getBalance(await verseiAsset.getAddress());
        expect(contractEthAfter).to.equal(contractEthBefore - totalPrice);
      });
  });

  describe("Base URI Management", function () {
    it("Should allow owner to set a new base URI", async function () {
      // 1. First create an asset to test URI with
      const createTx = await verseiAsset.createAsset(
        "Test Asset",
        "Test Category",
        1000,
        ethers.parseEther("0.1"),
        "5%",
        86400,
        owner.getAddress()
      );
      await createTx.wait();
  
      // 2. Set new base URI
      const newBaseURI = "https://api.example.com/updated-assets/";
      await verseiAsset.setBaseURI(newBaseURI);
  
      // 3. Verify the URI was updated (use tokenId 1 since it's the first created)
      const tokenId = 1;
      const currentURI = await verseiAsset.uri(tokenId);
      
      console.log("New base URI:", newBaseURI);
      console.log("Full token URI:", currentURI);
  
      // 4. Verify the URI contains the new base path and tokenId
      expect(currentURI).to.equal(`${newBaseURI}${tokenId}.json`);
    });
  });

  describe("Fallback function", function () {
    it("Should accept ETH via the fallback function", async function () {
      const initialBalance = await ethers.provider.getBalance(verseiAsset.getAddress());
      const amount = ethers.parseEther("1");

      await expect(() => user.sendTransaction({
        to: verseiAsset.getAddress(),
        value: amount
      })).to.changeEtherBalance(verseiAsset, amount);

      const finalBalance = await ethers.provider.getBalance(verseiAsset.getAddress());
      expect(finalBalance).to.equal(initialBalance + amount);
    });
  });
});
