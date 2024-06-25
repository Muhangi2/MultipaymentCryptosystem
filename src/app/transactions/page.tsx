"use client";
// src/CsvUploader.tsx
import React, { useState } from "react";
import { BaseRow, Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { ethers } from "ethers";

interface PaymentAccumulator {
  recipients: string[];
  amounts: number[];
  total: number;
}

declare global {
  interface Window {
    ethereum: any; // Use a more specific type if possible
  }
}
const Transactions: React.FC = () => {
  const [payments, setPayments] = useState<BaseRow[]>([]);
  const [sending, setSending] = useState(false);
  const [blockcahinExplorer, SetBlockChainExplorer] = useState(undefined);

  const SendPayments = async () => {
    // CONNECT to the metamask
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const { chainId } = await provider.getNetwork();
    //show feedback to the user
    setSending(true);
    // SetBlockChainExplorer(blockchainExplorerUrlschainId.toString()]);
    //format arguments for the smart contracts
    payments.reduce(
      (acc, val) => {
        acc.recipients.push(val.recipient as string);
        acc.amounts.push(val.amount as number);
        acc.total += parseInt(val.amount as any);
        return acc;
      },
      { recipients: [], amounts: [], total: 0 } as PaymentAccumulator
    );
    //send the transctions
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">CSV Uploader</h2>
        <Importer
          dataHandler={(rows) => setPayments(rows)}
          defaultNoHeader={false}
          restartable={false}
        >
          <ImporterField name="recipient" label="recipient" />
          <ImporterField name="amount" label="amount" />
          <ImporterField name="currency" label="currency" />
        </Importer>
        <button
          className="btn btn-primary mt-5"
          onClick={SendPayments}
          disabled={sending || typeof payments === "undefined"}
        >
          Send Payments
        </button>
        {sending && (
          <div className="alert alert-info  mt-4 mb-0">
            Your payments are processing
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
