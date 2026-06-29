export const noHtmlRegex = /<[^>]*>/;
export const noEmojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;

export const isValidName = (name: string) => {
  return /^[a-zA-Z\s\-'\.]+$/.test(name);
};

export const isValidCityState = (text: string) => {
  return /^[a-zA-Z\s\-\.]+$/.test(text);
};

const US_STATES = new Set([
  "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming",
  "dc", "district of columbia", "pr", "puerto rico"
]);

export const isValidUSState = (state: string) => {
  return US_STATES.has(state.toLowerCase().trim());
};

export const isValidZip = (zip: string) => {
  return /^\d+$/.test(zip);
};

export const isValidPhoneChars = (phone: string) => {
  return /^\+?\d*$/.test(phone);
};

export const formatPhoneInput = (input: string) => {
  let digits = input.replace(/\D/g, '');
  if (digits.length === 0) return "";

  const hasCountryCode = digits.startsWith('1');
  const maxLength = hasCountryCode ? 11 : 10;
  digits = digits.slice(0, maxLength);

  let formatted = "";
  if (hasCountryCode) {
    formatted = "+1 ";
    digits = digits.slice(1);
  }

  if (digits.length > 0) {
    formatted += "(" + digits.slice(0, 3);
  }
  if (digits.length >= 4) {
    formatted += ") " + digits.slice(3, 6);
  }
  if (digits.length >= 7) {
    formatted += "-" + digits.slice(6, 10);
  }

  return formatted;
};

// Real-time Keystroke Sanitizers
export const cleanZip = (val: string) => {
  const digits = val.replace(/\D/g, '').slice(0, 9);
  if (digits.length > 5) {
    return digits.slice(0, 5) + '-' + digits.slice(5);
  }
  return digits;
};

export const cleanCity = (val: string) => {
  return val.replace(/[^a-zA-Z\s\-\.]/g, '').replace(/\s{2,}/g, ' ').trimStart();
};

export const cleanState = (val: string) => {
  let cleaned = val.replace(/[^a-zA-Z\s]/g, '').replace(/\s{2,}/g, ' ').trimStart();
  if (cleaned.length === 2) {
    cleaned = cleaned.toUpperCase();
  }
  return cleaned;
};

export const cleanName = (val: string) => {
  return val.replace(/[^a-zA-Z\s\-'\.]/g, '').replace(/\s{2,}/g, ' ').trimStart();
};

export type ValidationErrors = {
  customLabel?: string;
  name?: string;
  street?: string;
  apt?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
  alternatePhone?: string;
};

export const validateAddressForm = (form: any, customLabelStr: string) => {
  const errors: ValidationErrors = {};

  const checkGeneral = (val: string) => {
    if (noHtmlRegex.test(val)) return "HTML/scripts are not allowed.";
    if (noEmojiRegex.test(val)) return "Emojis are not allowed.";
    return null;
  };

  // Location Label
  if (form.type === "Other") {
    const label = customLabelStr.trim();
    if (!label) errors.customLabel = "This field is required.";
    else {
      const genErr = checkGeneral(label);
      if (genErr) errors.customLabel = genErr;
    }
  }

  // Name
  const name = form.name?.trim() || "";
  if (!name) errors.name = "This field is required.";
  else if (name.length < 2 || name.length > 60) errors.name = "Name must be 2-60 characters.";
  else if (!isValidName(name)) errors.name = "Only letters, spaces, apostrophes, hyphens, and periods are allowed.";
  else {
    const genErr = checkGeneral(name);
    if (genErr) errors.name = genErr;
  }

  // Street
  const street = form.street?.trim() || "";
  if (!street) errors.street = "Street address is required.";
  else if (street.length < 5 || street.length > 120) errors.street = "Street address must be 5-120 characters.";
  else {
    const genErr = checkGeneral(street);
    if (genErr) errors.street = genErr;
  }

  // Apt
  const apt = form.apt?.trim() || "";
  if (apt.length > 50) errors.apt = "Maximum 50 characters.";
  else if (apt) {
    const genErr = checkGeneral(apt);
    if (genErr) errors.apt = genErr;
  }

  // ZIP
  const zip = form.zip?.trim() || "";
  if (!zip) {
    errors.zip = "This field is required.";
  } else if (/[^\d-]/.test(zip)) {
    errors.zip = "ZIP code can contain numbers only.";
  } else {
    const digits = zip.replace(/\D/g, '');
    if (digits.length < 5) {
      errors.zip = "ZIP code must contain exactly 5 digits.";
    } else if (digits.length > 5 && digits.length < 9) {
      errors.zip = "Enter a valid ZIP+4 format (12345-6789).";
    } else if (digits.length > 9) {
      errors.zip = "ZIP code cannot exceed 9 digits.";
    }
  }

  // City
  const city = form.city?.trim() || "";
  if (!city) errors.city = "This field is required.";
  else if (!isValidCityState(city)) errors.city = "City can only contain letters and spaces.";
  else {
    const genErr = checkGeneral(city);
    if (genErr) errors.city = genErr;
  }

  // State
  const state = form.state?.trim() || "";
  if (!state) errors.state = "This field is required.";
  else if (!isValidUSState(state)) errors.state = "Enter a valid US state.";
  else {
    const genErr = checkGeneral(state);
    if (genErr) errors.state = genErr;
  }

  // Country
  const country = form.country?.trim() || "";
  if (!country) errors.country = "This field is required.";
  else {
    const genErr = checkGeneral(country);
    if (genErr) errors.country = genErr;
  }

  // Alternate Phone
  const altPhone = form.alternatePhone?.trim() || "";
  if (altPhone) {
    const digits = altPhone.replace(/\D/g, '');
    const hasCountryCode = digits.startsWith('1');
    const requiredLength = hasCountryCode ? 11 : 10;
    
    if (digits.length < requiredLength) {
      errors.alternatePhone = "Enter a valid US phone number.";
    }
  }

  return errors;
};
