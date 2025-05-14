import { ReactNode } from 'react';

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void; // This will handle the state change for opening/closing the dialog
}


interface DialogContentProps {
  children: ReactNode;
  classname?: string;
}

interface DialogHeaderProps {
  children: ReactNode;
}

interface DialogTitleProps {
  children: ReactNode;
}

interface DialogTrigger {
  children: ReactNode;
}

interface DialogClose {
  children: ReactNode;
}

export const Dialog = ({ children, open, onOpenChange }: DialogProps) => (
  <div className={`dialog ${open ? 'open' : 'closed'}`}>
    {children}
  </div>
);

export const DialogTrigger = ({ children }: DialogProps) => (
  <button className="dialog-trigger">{children}</button>
);

export const DialogContent = ({ children, className }: DialogContentProps) => (
  <div className={`dialog-content bg-white p-4 rounded shadow-lg ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children }: DialogHeaderProps) => (
  <div className="dialog-header mb-2">{children}</div>
);

export const DialogTitle = ({ children }: DialogTitleProps) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

export const DialogClose = ({ children }: DialogClose) => (
  <button className="dialog-close">{children}</button>
);
