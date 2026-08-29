import React, { useState, useRef, useEffect } from 'react';
import { useAccount } from '../contexts/AccountContext';
import { Database, ChevronDown, Check } from 'lucide-react';

interface AccountSelectorProps {
  className?: string;
  compact?: boolean;
}

export default function AccountSelector({
  className = '',
  compact = false,
}: AccountSelectorProps): React.ReactElement | null {
  const { accounts, activeAccount, switchAccount, isLoading } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!accounts || accounts.length === 0) {
    return null;
  }

  const currentName = activeAccount?.name || 'Select Database';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isLoading}
        className={`flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs sm:text-sm font-medium transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-white/40 ${
          compact ? 'w-full justify-between' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Switch Account / Database"
      >
        <div className="flex items-center space-x-1.5 truncate">
          <Database className="w-4 h-4 shrink-0 text-white/90" />
          <span className="truncate max-w-[130px] sm:max-w-[180px]">{currentName}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-64 rounded-xl bg-white shadow-xl ring-1 ring-black/10 divide-y divide-neutral-100 focus:outline-none animate-in fade-in zoom-in-95 duration-100 ${
            compact ? 'left-0 right-0 w-full' : 'right-0'
          }`}
          role="menu"
        >
          <div className="px-3 py-2 bg-neutral-50 rounded-t-xl">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Databases & Accounts
            </p>
          </div>

          <div className="py-1 max-h-60 overflow-y-auto">
            {accounts.map((account) => {
              const isSelected = activeAccount?.id === account.id;

              return (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => {
                    switchAccount(account.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 flex items-start justify-between hover:bg-neutral-100 transition-colors ${
                    isSelected ? 'bg-orange-50/60 font-medium' : ''
                  }`}
                  role="menuitem"
                >
                  <div className="pr-2 truncate">
                    <p
                      className={`text-xs sm:text-sm truncate ${
                        isSelected ? 'text-brand-primary font-semibold' : 'text-neutral-800'
                      }`}
                    >
                      {account.name}
                    </p>
                    {account.description && (
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                        {account.description}
                      </p>
                    )}
                    <p className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                      {account.id}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

