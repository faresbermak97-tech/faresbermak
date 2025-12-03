import React, { useEffect, useRef } from 'react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  detailsTitle: string;
  details: readonly string[];
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  detailsTitle,
  details
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle focus trapping and keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before modal opened
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Trap focus within the modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus to the previous element when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 w-10 h-10 bg-gray-900 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors flex items-center justify-center text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="p-6 md:p-10">
          <h3 id="modal-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h3>

          <p className="text-md md:text-lg text-gray-700 mb-8 leading-relaxed">{description}</p>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">{detailsTitle}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {details.map((detail, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-[#4D64FF]/30 hover:bg-linear-to-br hover:from-gray-50 hover:to-blue-50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex gap-4">
                    {/* Numbered badge */}
                    <div className="flex-none">
                      <div className="w-8 h-8 rounded-lg bg-[#4D64FF] text-white flex items-center justify-center font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-medium"
                aria-label="Close details modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
