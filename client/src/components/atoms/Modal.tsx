import { MouseEventHandler, ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
    open: boolean;
    onClose: MouseEventHandler<HTMLDivElement>;
}

export default function Modal({ children, open, onClose }: ModalProps) {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? 'visible bg-black/80' : 'invisible'
            } z-50`}>
            <div
                className={`p-48 w-auto h-auto rounded shadow transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
                }`}>
                {children}
            </div>
        </div>
    );
}
