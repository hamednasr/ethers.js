import { ethers } from "./ethers-5.6.esm.min.js";

const connect = async () => {
  if (typeof window.ethereum != "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.querySelector("#connectButton").innerHTML = "Connected";
  } else
    document.querySelector("#connectButton").innerHTML = "Install Metamask";
};

const fund = async (ethAmount) => {
  if (typeof window.ethereum != "undefined") {
  }
};
