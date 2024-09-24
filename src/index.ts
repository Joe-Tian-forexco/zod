import { bankAccountExampleData } from "./data";
import { abaBulkUploadSchema } from "./schemas/accountBankAccount";

const { error, success } = abaBulkUploadSchema.safeParse(
  bankAccountExampleData
);

if (error) {
  const allErrors = error.errors;
  console.log("Errors length:", allErrors.length);
  console.log(allErrors);
}
