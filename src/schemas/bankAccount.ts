import { z } from "zod";
import { IBAN_REGEX, BA_REGEX, BIC_REGEX, BSB_REGEX } from "../config";
import { validateBankCountry } from "../utils";


export const createBankAccountBasePayload = z.object({
  iban: z
    .string()
    .regex(IBAN_REGEX, { message: "IBAN format not valid" })
    .transform((val) => val.trim())
    .optional(),
  country: z
    .string()
    .length(2, { message: "country code length not valid" })
    .nullish(),
  address: z.string().min(3).max(200).nullish(),
  city: z.string().min(3).max(50).nullish(),
  state: z.string().min(2).max(30).nullish(),
  postCode: z.string().min(1).max(10).nullish(),
  currency: z.string(),
  bankAccountName: z.string(),
  bankAccountNumber: z
    .string()
    .regex(BA_REGEX, { message: "Bank Account format not valid" })
    .transform((val) => val.trim())
    .optional(),
  bankName: z.string().min(3).nullish(),
  bankCountry: z
    .string()
    .length(2, { message: "country code length not valid" }),
  bankAddress: z.string().min(3).max(200).nullish(),
  bankCity: z.string().min(3).max(50).nullish(),
  bankState: z.string().min(2).max(30).nullish(),
  bankPostalCode: z.string().min(1).max(10).nullish(),
  bankSwift: z
    .string()
    .regex(BIC_REGEX, { message: "Bank Swift format not valid" })
    .transform((val) => val.trim())
    .optional(),
  bankBranchCode: z
    .string()
    .regex(BSB_REGEX, { message: "Bank Branch Code format not valid" })
    .transform((val) => val.trim())
    .optional(),
  bankSortCode: z.string().min(3).max(50).optional(),
  routingNumber: z.string().optional(),
  intermediaryBankSwift: z
    .string()
    .regex(BIC_REGEX, { message: "Intermediary Bank Swift format not valid" })
    .transform((val) => val.trim())
    .optional(),
  intermediaryBankCountry: z.string().optional(),
  intermediaryBankAddress: z.string().optional(),
  intermediaryBankName: z.string().optional(),
  intermediaryBankAccountNumber: z
    .string()
    .regex(BA_REGEX, {
      message: "intermediaryBankAccountNumber format not valid",
    })
    .transform((val) => val.trim())
    .optional(),
});

export const createBankAccountDto = createBankAccountBasePayload
  .refine(
    (schema) => {
      const { bankAccountNumber, iban } = schema;
      const invalid = !!bankAccountNumber && !!iban; // Note: both bankAccountNumber and iban are both present

      return !invalid;
    },
    {
      message: "iban or bankAccountNumber only",
      path: ["bankAccountNumber", "iban"],
    }
  )
  .refine(
    (schema) => {
      const { bankAccountNumber, iban } = schema;
      const invalid = !bankAccountNumber && !iban; // Note: both bankAccountNumber and iban are both missing

      return !invalid;
    },
    {
      message: "iban or bankAccountNumber required",
      path: ["bankAccountNumber", "iban"],
    }
  )
  .refine(
    (schema) => {
      const { bankCountry, bankSwift, iban } = schema;

      return validateBankCountry(bankCountry, iban, bankSwift);
    },
    {
      message: "iban or bankSwift not match bankCountry",
      path: ["bankCountry"],
    }
  )
  .refine(
    (schema) => {
      const { intermediaryBankCountry, intermediaryBankSwift } = schema;

      return validateBankCountry(
        intermediaryBankCountry,
        undefined,
        intermediaryBankSwift
      );
    },
    {
      message: "intermediaryBankCountry & intermediaryBankSwift not match",
      path: ["intermediaryBankCountry"],
    }
  )
  .refine(
    (schema) => {
      const { bankCountry, currency, bankBranchCode } = schema;
      const invalid =
        bankCountry === "AU" && currency === "AUD" && !bankBranchCode;

      return !invalid;
    },
    {
      message: "bankBranchCode required for Australian bank account",
      path: ["bankBranchCode"],
    }
  )
  .refine(
    (schema) => {
      const { bankCountry, currency, bankSortCode } = schema;
      const invalid =
        bankCountry === "GB" && currency === "GBP" && !bankSortCode;

      return !invalid;
    },
    {
      message: "bankSortCode required for UK bank account",
      path: ["bankSortCode"],
    }
  )
  .refine(
    (schema) => {
      const { bankCountry, currency, routingNumber } = schema;
      const invalid =
        bankCountry === "US" && currency === "USD" && !routingNumber;

      return !invalid;
    },
    {
      message: "routingNumber required for US bank account",
      path: ["routingNumber"],
    }
  );

export type CreateBankAccountDto = z.infer<typeof createBankAccountDto>;

export const bankAccountEntity = z.object({
  uuid: z.string(),
  country: z.string().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  postCode: z.string().nullish(),
  currency: z.string().nullish(),
  isArchived: z.boolean().default(false),
  bankAccountName: z.string(),
  bankAccountNumber: z.string().default("-"),
  iban: z.string().default("-"),
  bankName: z.string().nullish(),
  bankCountry: z.string(),
  bankAddress: z.string().nullish(),
  bankCity: z.string().nullish(),
  bankState: z.string().nullish(),
  bankPostalCode: z.string().nullish(),
  bankSwift: z.string().nullish(),
  bankBranchCode: z.string().nullish(),
  bankSortCode: z.string().nullish(),
  routingNumber: z.string().nullish(),
  intermediaryBankSwift: z.string().nullish(),
  intermediaryBankCountry: z.string().nullish(),
  intermediaryBankAddress: z.string().nullish(),
  intermediaryBankName: z.string().nullish(),
  intermediaryBankAccountNumber: z.string().nullish(),
  reference: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BankAccountEntity = z.infer<typeof bankAccountEntity>;
