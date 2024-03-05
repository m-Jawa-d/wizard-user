import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import Environment from "@/utils/Enviroment";
// import { getMarketContract, getOnceNftContract } from "../../utils/contractHelpers";
import { getMarketPlaceContract, getLaunchedPadContract } from "@/utils/contractHelpers";

export const AcceptOffer = () => {
    const web3 = useWeb3();
    const stakingAddress = Environment.marketPlaceContract;
    const mintAddress = Environment.launchPadContract;
    const contract = getMarketPlaceContract(stakingAddress, web3);
    // const approvecontract = getLaunchedPadContract(mintAddress, web3);
    // console.log(contract, "sufyan scverver");
    const { account } = useWeb3React()

    const AcceptOfferHook = useCallback(
        async (collectionAddr, tokenID, index) => {
            console.log(  collectionAddr,  tokenID,  index);
            // const approvecontract = getLaunchedPadContract(collectionAddr, web3);
            // console.log(salePrice, environment.Marketplace, tokenID, "jawadddddddddddddd")
            try {
                var gasFunPrice;
                web3.eth.getGasPrice().then((result) => {
                    var result2 = parseInt(result) 
                    gasFunPrice = result2.toString()
                })
            
                const gas = await contract.methods.acceptOffer(collectionAddr, tokenID, 0).estimateGas({ from: account });
                const staked = await contract.methods.acceptOffer(collectionAddr, tokenID, 0).send({ from: account, gasPrice: gasFunPrice , gas: gas })
                    .on("transactionHash", (tx) => {
                        return tx.transactionHash;
                    })
                    .catch((error) => {
                        throw error;
                    });
                return staked;
             
            } catch (e) {
                console.log('Error putting on sale:', e);
                throw e;
            }
        },
        [contract, account, stakingAddress]
    );

    return { AcceptOfferHook: AcceptOfferHook };
};

export default AcceptOffer;