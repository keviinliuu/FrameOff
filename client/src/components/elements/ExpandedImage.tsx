import { MouseEventHandler, ReactNode } from 'react';

interface ExpandedImageProps {
    children: ReactNode;
    open: boolean;
    onClose: MouseEventHandler<HTMLDivElement>;
}

export default function ExpandedImage({ children, open, onClose }: ExpandedImageProps) {
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
