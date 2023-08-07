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
            className={`flex items-center rounded bg-${bgColor} font-main text-${textColor}`}
            onClick={onClick}>
            {icon && <span className='mr-2'>{icon}</span>}
            {children}
        </button>
    );
}
