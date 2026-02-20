// Format phone number to (XXX) XXX-XXXX
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limited = digits.slice(0, 10);
  
  // Format based on length
  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
};

// Format zipcode to XXXXX or XXXXX-XXXX
export const formatZipcode = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 9 digits
  const limited = digits.slice(0, 9);
  
  // Format based on length
  if (limited.length <= 5) return limited;
  return `${limited.slice(0, 5)}-${limited.slice(5)}`;
};

// Validate and format website URL
export const formatWebsite = (value: string): string => {
  // Remove whitespace
  let formatted = value.trim();
  
  // If it doesn't start with http:// or https://, add https://
  if (formatted && !/^https?:\/\//i.test(formatted)) {
    // Don't auto-add if user is still typing
    return formatted;
  }
  
  return formatted;
};

// Only allow digits
export const onlyDigits = (value: string): string => {
  return value.replace(/\D/g, '');
};

// Only allow alphanumeric and spaces (for names)
export const onlyAlphanumericAndSpaces = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9\s]/g, '');
};

// Only allow alphanumeric, spaces, and common address characters
export const onlyAddressChars = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9\s.,#-]/g, '');
};
