import { ReactNode } from 'react';
import { library, IconName } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab);

interface ShareButtonProps {
    children: ReactNode;
    bgColor: string;
    icon: IconName;
    onClick: () => void;
}

export default function ShareButton({ children, bgColor, icon, onClick }: ShareButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center rounded ${bgColor} h-12 w-2/5 px-3 py-0.5 pt-1.5 font-main text-2xl text-white`}
            onClick={onClick}>
            <FontAwesomeIcon
                icon={['fab', icon]}
                style={{ color: '#ffffff' }}
                className='mr-4 pb-1.5'
            />
            Share on {children}
        </button>
    );
}
