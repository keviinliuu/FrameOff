import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SlidePickerProps {
    activeIndex: number;
    activeCount: number;
    scrollTo: (i: number) => void;
}

export default function SlidePicker({ activeIndex, activeCount, scrollTo }: SlidePickerProps) {
    return (
        <div className='flex flex-col absolute bottom-4 md:top-1/2 items-center justify-center sm:right-8 md:left-16 md:translate-y-[-50%] select-none'>
            <div className='flex flex-col md:gap-y-3 w-full translate-x-[-50%] text-xl md:text-3xl'>
                <FontAwesomeIcon
                    className={`text-neutral-400 sm:hidden ${
                        activeIndex >= 1 ? 'cursor-pointer' : 'opacity-30'
                    }`}
                    icon={faChevronUp}
                    onClick={() => {
                        if (activeIndex >= 1) scrollTo(activeIndex - 1);
                    }}
                />

                <div className='flex flex-row text-blush text-xl md:text-3xl justify-center md:gap-x-3 items-center w-full'>
                    <div className='absolute text-right self-end right-[1.25rem] md:right-[2rem]'>
                        {activeIndex + 1}
                    </div>
                    <div className='flex text-center'>/</div>
                    <div className='absolute flex text-left self-start left-[1.25rem] md:left-[2rem]'>
                        {activeCount}
                    </div>
                </div>

                <FontAwesomeIcon
                    className={`text-neutral-400 cursor-pointer sm:hidden ${
                        activeIndex < activeCount - 1 ? 'cursor-pointer' : 'opacity-30'
                    }`}
                    icon={faChevronDown}
                    onClick={() => {
                        if (activeIndex < activeCount - 1) scrollTo(activeIndex + 1);
                    }}
                />
            </div>
        </div>
    );
}
