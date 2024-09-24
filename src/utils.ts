export const validateBankCountry = (
  bankCountryCode: string | undefined | null,
  iban: string | undefined | null,
  bankSwift: string | undefined | null
) => {
  if (!bankCountryCode) return true;

  const countryCode = bankCountryCode.toLocaleLowerCase();

  const isIbanMatched = !iban
    ? true
    : countryCode ===
      iban.replace(/\s|-/g, "").substring(0, 2).toLocaleLowerCase();

  const isSwiftMatched = !bankSwift
    ? true
    : countryCode ===
      bankSwift.replace(/\s|-/g, "").substring(4, 6).toLocaleLowerCase();

  return isIbanMatched && isSwiftMatched;
};
