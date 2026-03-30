export type Language = 'en' | 'ru' | 'uz';

export const getCurrencySymbol = (language: Language): string => {
  const currencyMap: Record<Language, string> = {
    en: '$',
    ru: '$',
    uz: 'so\'m'
  };
  return currencyMap[language];
};

export const formatPrice = (price: number, language: Language): string => {
  const currencySymbol = getCurrencySymbol(language);
  
  if (language === 'uz') {
    // Format for Uzbek som: "1,234,567 so'm"
    return `${price.toLocaleString('uz-UZ')} ${currencySymbol}`;
  } else if (language === 'ru') {
    // Format for Russian currency: "$1,234.00"
    return `$${price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  } else {
    // Format for English: "$1,234.00"
    return `${currencySymbol}${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
};
