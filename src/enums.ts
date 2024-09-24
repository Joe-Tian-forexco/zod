export enum BusinessStructure {
  Association = "Association",
  Company = "Company",
  Government_Body = "Government Body",
  Partnership = "Partnership",
  Registered_Body = "Registered Body",
  Trust = "Trust",
}

export enum OpenPaydBeneficiaryType {
  CORPORATE = "CORPORATE",
  RETAIL = "RETAIL",
}

export const IdType: { [key: number]: string } = {
  1: "Passport",
  2: "Driver license",
  3: "National Identification Card",
};

export const PURPOSE_OF_TRANSACTION = {
  "Charity Donation":
    "Please provide supporting document that includes the charity information and the bank account details.",
  "Client Payment":
    "Please provide the KYC documents collected form the client including but not limited to ID and proof of residential address, account statement and proof of withdrawal request.",
  "Corporate loans":
    "Please provide supporting document to prove the relationship with the beneficiary (i.e. executed loan agreement)",
  "Expense for services":
    "Please provide supporting document that prove the relationship with the beneficiary (i.e. executed services agreement, invoices).",
  "Foreign exchange conversion (physical)":
    "Please provide supporting document that includes the executed trades with the exchange provider (i.e. execution and settlement details)",
  "IB Rebate":
    "Please provide supporting document to prove the relationship with the Introducing broker (i.e. executed IB agreement).",
  "Investments/Capital Transfer":
    "Please provide supporting document for the investments.",
  "Liquidity provider":
    "Please provide supporting document that proves the relationship with the liquidity provider (i.e. executed agreement with liquidity provider)",
  "Own account transfer": "",
  "Payment service provider":
    "Please provide supporting document that proves the relationship wit the payment services provider (i.e. executed service agreement)",
  Salaries:
    "Please provide supporting document to prove the employment of beneficiary (i.e. employment confirmation letter)",
  "Supporting family and friends":
    "Please provide supporting documents to prove the relationship with the beneficiary (i.e. birth certificate)",
  "Trades for Goods":
    "Please provide supporting document for the purchase of the good (i.e. purchase order, invoice)",
  Other:
    "Please provide any supporting document to prove the relationship with the beneficiary.",
};
