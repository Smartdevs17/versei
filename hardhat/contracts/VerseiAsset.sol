// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VerseiAsset is ERC1155Supply, Ownable {
    struct Asset {
        string name;
        string category;
        uint256 totalTokens;
        uint256 tokenPrice; // in wei
        string yieldRate;
        uint256 lockEndTime; // for initial creator
        bool verified;
    }

    string private _baseURI;
    mapping(uint256 => Asset) public assets;
    mapping(uint256 => uint256) public profitPools;
    mapping(address => mapping(uint256 => uint256)) public userLockEndTime;

    uint256 private _currentTokenId = 0;

    event AssetCreated(uint256 indexed tokenId, string name, uint256 totalTokens);
    event AssetVerified(uint256 indexed tokenId);
    event ProfitDistributed(uint256 indexed tokenId, uint256 amount);
    event ProfitClaimed(uint256 indexed tokenId, address indexed account, uint256 amount);
    event AssetBought(uint256 indexed tokenId, address indexed buyer, uint256 quantity, uint256 totalPrice);
    event AssetSold(uint256 indexed tokenId, address indexed seller, uint256 quantity, uint256 totalPrice);

    constructor() ERC1155("") Ownable(msg.sender) {
        _baseURI = "http://localhost:3000/api/assets/";
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(_baseURI, Strings.toString(tokenId), ".json"));
    }

    function setBaseURI(string memory newUri) external onlyOwner {
        _baseURI = newUri;
    }

    function createAsset(
        string memory name,
        string memory category,
        uint256 totalTokens,
        uint256 tokenPrice,
        string memory yieldRate,
        uint256 lockDuration,
        address initialOwner
    ) external onlyOwner returns (uint256) {
        _currentTokenId += 1;
        uint256 tokenId = _currentTokenId;

        assets[tokenId] = Asset({
            name: name,
            category: category,
            totalTokens: totalTokens,
            tokenPrice: tokenPrice,
            yieldRate: yieldRate,
            lockEndTime: block.timestamp + lockDuration,
            verified: false
        });

        _mint(initialOwner, tokenId, totalTokens, "");
        userLockEndTime[initialOwner][tokenId] = block.timestamp + lockDuration;

        emit AssetCreated(tokenId, name, totalTokens);
        return tokenId;
    }

    function verifyAsset(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Asset does not exist");
        assets[tokenId].verified = true;
        emit AssetVerified(tokenId);
        
    }

    function distributeProfit(uint256 tokenId, uint256 amount) external onlyOwner {
        require(_exists(tokenId), "Asset does not exist");
        profitPools[tokenId] += amount;
        emit ProfitDistributed(tokenId, amount);
    }

    function claimProfit(uint256 tokenId) external {
        require(_exists(tokenId), "Asset does not exist");
        require(block.timestamp > userLockEndTime[msg.sender][tokenId], "Asset is locked");

        uint256 balance = balanceOf(msg.sender, tokenId);
        require(balance > 0, "No tokens owned");

        uint256 total = totalSupply(tokenId);
        uint256 pool = profitPools[tokenId];

        uint256 share = (pool * balance) / total;
        require(share > 0, "No profit to claim");

        profitPools[tokenId] -= share;
        (bool success, ) = msg.sender.call{value: share}("");
        require(success, "Transfer failed");

        emit ProfitClaimed(tokenId, msg.sender, share);
    }

    function buyAsset(uint256 tokenId, uint256 quantity) external payable {
        require(_exists(tokenId), "Asset does not exist");
        require(assets[tokenId].verified, "Asset not verified");

        uint256 price = assets[tokenId].tokenPrice * quantity;
        require(msg.value >= price, "Insufficient payment");

        _mint(msg.sender, tokenId, quantity, "");
        userLockEndTime[msg.sender][tokenId] = block.timestamp + (assets[tokenId].lockEndTime - block.timestamp);

        emit AssetBought(tokenId, msg.sender, quantity, price);
    }

    function sellAsset(uint256 tokenId, uint256 quantity) external {
        require(_exists(tokenId), "Asset does not exist");
        require(block.timestamp >= userLockEndTime[msg.sender][tokenId], "Tokens are still locked");

        uint256 balance = balanceOf(msg.sender, tokenId);
        require(balance >= quantity, "Insufficient balance");

        uint256 refund = assets[tokenId].tokenPrice * quantity;

        _burn(msg.sender, tokenId, quantity);
        (bool sent, ) = msg.sender.call{value: refund}("");
        require(sent, "Refund failed");

        emit AssetSold(tokenId, msg.sender, quantity, refund);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return totalSupply(tokenId) > 0;
    }

    receive() external payable {}
}
