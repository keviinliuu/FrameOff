import { ReactNode } from 'react';

export interface GeneralButtonProps {
    children: ReactNode;
    textColor: string;
    bgColor: string;
    icon?: ReactNode;
    onClick: () => void;
}

export default function GeneralButton({
    children,
    textColor,
    bgColor,
    icon,
    onClick,
}: GeneralButtonProps) {
    return (
        <button
            className={`items-center inline-flex rounded-sm ${bgColor} w-24 h-8 px-3 py-0.5 pt-1.5 font-main ${textColor}`}
            onClick={onClick}>
            {icon && <span className='mr-2'>{icon}</span>}
            {children}
        </button>
    );
}
