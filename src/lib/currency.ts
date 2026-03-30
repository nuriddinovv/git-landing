export type Language = "en" | "ru" | "uz";

export const getCurrencySymbol = (language: Language): string => {
  // All languages display prices in Uzbek som (UZS)
  return "UZS";
};

export const formatPrice = (price: number, language: Language): string => {
  const currencySymbol = getCurrencySymbol(language);

  // Format number based on language locale
  const formattedNumber = price.toLocaleString(
    language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US",
    { minimumFractionDigits: 0, maximumFractionDigits: 0 },
  );

  // Return format: "1,234,567 so'm"
  return `${formattedNumber} ${currencySymbol}`;
};
