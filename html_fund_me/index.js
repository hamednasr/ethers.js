const connect = async () => {
  if (typeof window.ethereum != "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
  } else console.log("metamask not installed!");
};

connect;
