import { useUserDetailsStore } from '../../stores';

const useDepartmentSelector = () => {
  // 1. Destructure your Zustand state and setter
  const { department, setUserDepartment } = useUserDetailsStore();

  // 2. The strict array of allowed engineering departments
  const validDepartments = ['ECE', 'EE', 'ME', 'CSE', 'ETC'];

  // 3. Safe setter function that updates the GLOBAL store
  const handleSetDepartment = (selectedValue) => {
    if (validDepartments.includes(selectedValue) || selectedValue === '') {
      // Update the Zustand store directly
      setUserDepartment(selectedValue);
    } else {
      console.warn(`System Alert: Attempted to set invalid department [${selectedValue}]`);
    }
  };

  return { 
    // Return the value from Zustand so the UI stays in sync
    currentdepartment: department, 
    setDepartment: handleSetDepartment, 
    validDepartments 
  };
};

export default useDepartmentSelector;