import { useUserDetailsStore } from '../../stores';

const useYearSelector = () => {
  // 1. Pull the global batch value and the setter from your store
  const { batch, setUserBatch } = useUserDetailsStore();

  // 2. Strict range of allowed years as STRINGS
  const validYears = ["2026", "2027", "2028", "2029", "2030"];

  // 3. Safe setter function
  const handleSetYear = (selectedValue) => {
    // Keep it as a string. If it's a number from an input, convert it.
    const stringValue = selectedValue.toString();

    // Validate against the string array
    if (validYears.includes(stringValue) || stringValue === '') {
      setUserBatch(stringValue);
    } else {
      console.warn(`System Alert: Attempted to set invalid year [${stringValue}]`);
    }
  };

  return {
    // Returns the string value from the store
    year: batch,
    setYear: handleSetYear,
    validYears
  };
};

export default useYearSelector;