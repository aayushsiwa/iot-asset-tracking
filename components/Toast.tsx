import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  bgColor?: string;
  textColor?: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  bgColor,
  textColor,
  duration,
}) => {
  useEffect(() => {
    const toastElement = document.createElement("div");
    toastElement.className = `${bgColor} ${textColor} py-2 px-4 rounded opacity-50 shadow-md transition ease-in-out`;
    toastElement.textContent = message;
    toastElement.style.position = "fixed";
    toastElement.style.top = "6rem";
    toastElement.style.right = "1rem";
    toastElement.style.zIndex = "9999";
    document.body.appendChild(toastElement);
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, duration); // Remove the toast after specified duration
  }, [message, bgColor, textColor, duration]);

  return null; // This component doesn't render anything in the DOM
};

export default Toast;
