import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook for managing device binding OTP modal state.
 * Handles the visibility and data flow for the device binding OTP verification.
 */
export const useDeviceBinding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Check if device binding is required from sessionStorage
  useEffect(() => {
    const deviceBindingRequired = sessionStorage.getItem(
      "deviceBindingRequired"
    );
    if (deviceBindingRequired) {
      const data = JSON.parse(deviceBindingRequired);
      setIsModalOpen(true);
      // Clean up after setting
      sessionStorage.removeItem("deviceBindingRequired");
    }
  }, []);

  const openModal = useCallback((email) => {
    setUserEmail(email);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setUserEmail("");
  }, []);

  const handleSuccess = useCallback(() => {
    setIsModalOpen(false);
    setUserEmail("");
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
    userEmail,
    handleSuccess,
  };
};
