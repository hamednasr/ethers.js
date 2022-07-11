// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    // 835001
    // 815663
    address public immutable i_owner;
    uint256 public constant minimumUSD = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            PriceConverter.getConversionRate(msg.value, priceFeed) > minimumUSD,
            "you should pay more!"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public isOwner {
        // require(msg.sender == owner, 'you are not the owner!');
        for (uint256 i = 0; i < funders.length; i++)
            addressToAmountFunded[funders[i]] = 0;

        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed!");
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    modifier isOwner() {
        // require(msg.sender == i_owner, 'you are not the owner!');
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }
}
