export function formatAmountForStripe(amount: number, currency: string): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;

  parts.forEach((part) => {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  });
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
