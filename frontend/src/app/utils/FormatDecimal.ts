function formatDecimal(number?: number | null, decimalPlaces: number = 2): string {
  if (number === null || number === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(number);
}

export { formatDecimal }