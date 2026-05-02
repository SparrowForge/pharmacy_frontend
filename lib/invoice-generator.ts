/**
 * Generate a unique invoice number in format: INV-YYYYMMDD-XXXXX
 * @param sequenceNumber - Optional sequence number (auto-incremented if not provided)
 * @returns Invoice number string
 */
export function generateInvoiceNumber(sequenceNumber?: number): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  
  const sequence = sequenceNumber || Math.floor(Math.random() * 99999) + 1
  const paddedSequence = String(sequence).padStart(5, '0')
  
  return `INV-${year}${month}${date}-${paddedSequence}`
}

/**
 * Get the next invoice sequence number for a specific date
 * In production, this would query the database
 * @param date - Date to get sequence for (defaults to today)
 * @returns Next sequence number
 */
export function getNextSequenceNumber(date: Date = new Date()): number {
  // This is a mock implementation
  // In production, query database for count of invoices on this date
  const storedCount = localStorage?.getItem(`invoice_count_${date.toISOString().split('T')[0]}`)
  const count = storedCount ? parseInt(storedCount) : 0
  const nextCount = count + 1
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(`invoice_count_${date.toISOString().split('T')[0]}`, nextCount.toString())
  }
  
  return nextCount
}

/**
 * Generate invoice with automatic sequence
 * @returns Complete invoice number with auto-incremented sequence
 */
export function generateUniqueInvoiceNumber(): string {
  const sequence = getNextSequenceNumber()
  return generateInvoiceNumber(sequence)
}

/**
 * Format invoice number for display
 * @param invoiceNumber - Invoice number to format
 * @returns Formatted invoice number
 */
export function formatInvoiceNumber(invoiceNumber: string): string {
  return invoiceNumber.toUpperCase()
}

/**
 * Parse invoice number to extract date and sequence
 * @param invoiceNumber - Invoice number in format INV-YYYYMMDD-XXXXX
 * @returns Object with date and sequence number
 */
export function parseInvoiceNumber(invoiceNumber: string): {
  date: Date
  sequence: number
  isValid: boolean
} {
  const regex = /^INV-(\d{4})(\d{2})(\d{2})-(\d{5})$/
  const match = invoiceNumber.match(regex)
  
  if (!match) {
    return { date: new Date(), sequence: 0, isValid: false }
  }
  
  const [, year, month, day, sequence] = match
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  
  return {
    date,
    sequence: parseInt(sequence),
    isValid: true,
  }
}
