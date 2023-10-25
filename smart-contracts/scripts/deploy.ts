import hardhat, { ethers, network } from "hardhat";

const name = "name";
const symbol = "symbol";

async function main() {

  const Factory = await ethers.getContractFactory("FactoryERC721");
  const factory = await Factory.deploy();
  await factory.deployed();

  console.log("Factory contract deployed to:", factory.address);

  const Item = await ethers.getContractFactory("ERC721Item");
  const item = await Item.deploy(name, symbol);
  await item.deployed();

  console.log("Item contract deployed to:", item.address);

  console.log("Waiting for 5 confirmations");
  await item.deployTransaction.wait(5);
  console.log("Confirmed!");

  console.log("Verifying...");
  await hardhat.run("verify:verify", {
    address: factory.address,
    constructorArguments: [],
  });

  console.log("Verifying...");
  await hardhat.run("verify:verify", {
    address: item.address,
    constructorArguments: [name, symbol],
  });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
