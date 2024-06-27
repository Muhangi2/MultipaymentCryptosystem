import React, { useState  } from "react";
import { BaseRow, Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { ethers, Contract } from "ethers";
import Multipaymentjson from "../utils/Multipayment.json";
import { contractaddress } from "../utils/constant";


///newcontent
const blockcahinExplorerUrls={
  "80002":"https://amoy.polygonscan.com/"
}

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


const Welcome = () => {

  //necontent
  const [payments, setPayments] = useState(undefined);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [blockchainExplorer, SetBlockChainExplorer] = useState(undefined);

  const SendPayments = async () => {
    if (!payments || payments.length === 0) {
      setError(true);
      console.error("No payments to send. Please upload a CSV file.");
      return;
    }
  
    // Check if MetaMask is installed
    const { ethereum } = window;
    if (!ethereum) {
      setError(true);
      console.error("MetaMask is not installed.");
      return;
    }
  
    try {
      // Request account access if needed
      await ethereum.request({ method: "eth_requestAccounts" });
  
      // Set up provider and signer
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const { chainId } = await provider.getNetwork();
      SetBlockChainExplorer(blockcahinExplorerUrls[chainId.toString()] || "https://polygonscan.com");
  
      // Show feedback to the user
      setSending(true);
  
      // Format arguments for the smart contract
      const { recipients, amounts, total } = payments.reduce(
        (acc, val) => {
          acc.recipients.push(val.recipient);
          const amountInWei = ethers.utils.parseUnits(val.amount.toString(), "ether");
          acc.amounts.push(amountInWei);
          acc.total = acc.total.add(amountInWei);
          return acc;
        },
        { recipients: [], amounts: [], total: ethers.BigNumber.from(0) }
      );
  
      // Send the transactions
      const multisend = new Contract(contractaddress, Multipaymentjson.abi, signer);
      console.log("recipients", recipients);
      console.log("amounts", amounts);
      console.log("total", total.toString());
  
      const tx = await multisend.send(recipients, amounts, { value: total });
      const transactionReceipt = await tx.wait();
      console.log(transactionReceipt);
      setTransactions(transactionReceipt.hash);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setSending(false);
    }
  };
  

  return (
    <div className="flex w-full justify-center items-center bg-green-400 min-h-full">
   <div className="flex flex-col mf:flex-row items-start justify-between md:p-20 py-12 bg-blue-800  w-full">

   <div className="flex flex-1 flex-col items-center justify-start w-full mf:mt-0 mt-10 mf:ml-10 ">
    <div className="flex flex-1 justify-start items-start flex-col mf:mr-4 w-full">
      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
        Multipayment  <br /> Send Ethereum across the world
      </h1>
      <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
        Explore the crypto world.Send Ethereum across Multiple addrees with feew gas fees.
      </p>
      {/* cardfordescribing */}
      <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
          Reliability
        </div>
        <div className={companyCommonStyles}>Security</div>
        <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
          Ethereum
        </div>
        <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
          Web 3.0
        </div>
        <div className={companyCommonStyles}>Low Fees</div>
        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
          Blockchain
        </div>
      </div>
    </div>
    
  </div>
  <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
    <div className="p-5 sm:w-full w-full flex flex-col justify-start items-center blue-glassmorphism">
      <Importer
        dataHandler={(rows) => setPayments(rows)}
        defaultNoHeader={false}
        restartable={false}
      >
        <ImporterField name="recipient" label="recipient" />
        <ImporterField name="amount" label="amount" />
        <ImporterField name="currency" label="currency" />
      </Importer>
      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {/* Uncomment if loading indicator is needed */}
      {/* {isLoading
        ? <Loader />
        : ( */}
      <button
        className="text-white w-full mt-2 border-[1px] p-4 border-[#124bdb] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
        onClick={SendPayments}
        disabled={sending || typeof payments === "undefined"}
      >
        Send Payments
      </button>
      {/* )} */}
      {sending && (
        <div className="alert alert-info mt-4 mb-0">
          Your payments are processing
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4 mb-0">
          Oops, there is something wrong
        </div>
      )}
      {transactions && (
        <div className="alert alert-success mt-4 mb-0">
          You have sent money successfully{" "}
          <a href={`${blockchainExplorer}/${transactions}`} target="_blank">
            {`${transactions.substr(0, 20)}..`}
          </a>
        </div>
      )}
    </div>
  </div>
  
</div>


    </div>
  );
};

export default Welcome;
