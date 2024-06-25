"use client";
// src/CsvUploader.tsx
import React from "react";
import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";

const Transactions: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">CSV Uploader</h2>
        <Importer
          dataHandler={(rows) => console.log(rows)}
          defaultNoHeader={false}
          restartable={false}
        >
          <ImporterField name="recipient" label="recipient" />
          <ImporterField name="amount" label="amount" />
          <ImporterField name="currency" label="currency" />
        </Importer>
        ;
      </div>
    </div>
  );
};

export default Transactions;
