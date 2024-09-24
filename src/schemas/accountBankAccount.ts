import { z } from "zod";
import {
  createBankAccountBasePayload,
  createBankAccountDto,
} from "./bankAccount";
import { EMAIL_REGEX } from "../config";
import { OpenPaydBeneficiaryType, BusinessStructure } from "../enums";
import { validateBankCountry } from "../utils";

const createAccountBankAccountBasePayload = z.object({
  purposeOfPayment: z.string().nullish(),
  beneficiaryType: z.nativeEnum(OpenPaydBeneficiaryType),
  phone: z.string().nullish(),
  email: z
    .string()
    .regex(EMAIL_REGEX, { message: "Email not valid" })
    .transform((val) => val.trim())
    .nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  dob: z.string().nullish(),
  occupation: z.string().nullish(),
  documentationType: z.string().nullish(),
  idNumber: z.string().nullish(),
  idInsurer: z.string().nullish(), // Note: share for both beneficiaryType
  idExpiryDate: z.string().nullish(), // Note: share for both beneficiaryType
  registrationNumber: z.string().nullish(),
  businessStructure: z.nativeEnum(BusinessStructure).nullish(),
  estimatedFrequencyPerMonth: z.number().nullish(),
  estimatedTransactionSize: z.number().nullish(),
  reference: z.string().nullish(),
});

export const createAccountBankAccountDto = createAccountBankAccountBasePayload
  .extend({ bankAccount: createBankAccountDto })
  .refine(
    (schema) => {
      const { bankCountry, iban, bankSwift } = schema.bankAccount;

      return validateBankCountry(bankCountry, iban, bankSwift);
    },
    { message: "Bank Country not match SWIFT or IBAN", path: ["bankCountry"] }
  );

export type CreateAccountBankAccountDto = z.infer<
  typeof createAccountBankAccountDto
>;

const createAccountBankAccountPayload =
  createAccountBankAccountBasePayload.merge(createBankAccountBasePayload);

export type CreateAccountBankAccountPayload = z.infer<
  typeof createAccountBankAccountPayload
>;

export const abaBulkUploadSchema = z.array(createAccountBankAccountDto);
