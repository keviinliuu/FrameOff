import { CE } from '../data/types';
import Logo from '../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export interface PollInfoProps {
    handleTitle: (e: CE) => string;
    handleDescription: (e: CE) => string;
}

export default function PollInfo({ handleTitle, handleDescription }: PollInfoProps) {
    return (
        <div className='min-h-screen: space-y-20 bg-midnight'>
            <div className='flex'>
                <Logo />
            </div>
            <div className='space-y-4'>
                <div className='flex justify-center gap-y-4 text-white'>
                    Give your duel a title!
                </div>
                <div className='flex justify-center gap-x-8'>
                    <input
                        className=' sm:text-md w-3/5 rounded-lg border-2 border-blush bg-nocturne p-4 text-center text-plum placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0'
                        placeholder='enter title'
                        onChange={handleTitle}
                    />
                </div>
            </div>
            <div className='space-y-4'>
                <div className='flex justify-center gap-y-4 text-plum'>
                    and a description too! (if you want...)
                </div>
                <div className='flex justify-center gap-x-8'>
                    <input
                        className=' sm:text-md w-3/5 rounded-lg border-2 border-blush bg-nocturne p-4 text-center text-plum placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0'
                        placeholder='enter description'
                        onChange={handleDescription}
                    />
                </div>
            </div>
            <div className = 'space-y-30 flex justify-center gap-y-4'>
                <FontAwesomeIcon icon={faArrowDown} className='cursor-pointer text-blush fa-3x' />
            </div>
        </div>
    );
}
