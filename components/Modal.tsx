import React from "react";

export const Modal: React.FC<{ isActive: boolean }> = ({
  children,
  isActive,
}) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${!isActive && "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {children}
      </div>
    </div>
  );
};

export const ModalOverlay: React.FC<{
  onClick: React.MouseEventHandler;
}> = ({ onClick }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={onClick}
      ></div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
    </>
  );
};

export const ModalContent: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return (
    <div
      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      style={style}
    >
      <div className="bg-white pb-4 pt-5 sm:pb-4">{children}</div>
    </div>
  );
};

export const ModalHeader: React.FC<{
  borderless?: boolean;
  onClose?: React.MouseEventHandler;
}> = ({ children, borderless, onClose }) => {
  return (
    <div className={`${!borderless && "border-b"} pb-4 px-6 mb-5`}>
      {children}

      {onClose && (
        <div
          onClick={onClose}
          className="absolute cursor-pointer right-6 top-6"
        >
          <svg
            className="fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export const ModalBody: React.FC = ({ children }) => {
  return <div className="pb-4 px-6">{children}</div>;
};

export const ModalFooter: React.FC<{ borderless?: boolean }> = ({
  children,
  borderless,
}) => {
  return (
    <div
      className={`${
        !borderless && "border-t"
      } pt-4 px-6 sm:flex sm:flex-row-reverse`}
    >
      {children}
    </div>
  );
};

export const Close: React.FC = () => {
  return (
    <svg
      className="fill-current text-black"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
    </svg>
  );
};
