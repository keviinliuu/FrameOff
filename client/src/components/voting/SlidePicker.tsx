import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SlidePickerProps {
    activeIndex: number;
    activeCount: number;
    scrollTo: (i: number) => void;
}

export default function SlidePicker({ activeIndex, activeCount, scrollTo }: SlidePickerProps) {
    return (
        <div className='flex flex-col absolute top-1/2 items-center justify-center left-20 translate-y-[-50%] select-none'>
            <div className='flex flex-col gap-y-3 w-full translate-x-[-50%]'>
                <FontAwesomeIcon
                    className={`text-neutral-400 ${
                        activeIndex >= 1 ? 'cursor-pointer' : 'opacity-30'
                    }`}
                    icon={faChevronUp}
                    size='2xl'
                    onClick={() => {
                        if (activeIndex >= 1) scrollTo(activeIndex - 1);
                    }}
                />

                <div className='flex flex-row text-blush text-3xl justify-center gap-x-3 items-center w-full'>
                    <div className='absolute text-right self-end right-[2rem]'>
                        {activeIndex + 1}
                    </div>
                    <div className='flex text-center'>/</div>
                    <div className='absolute flex text-left self-start left-[2rem]'>
                        {activeCount}
                    </div>
                </div>

                <FontAwesomeIcon
                    className={`text-neutral-400 cursor-pointer ${
                        activeIndex < activeCount - 1 ? 'cursor-pointer' : 'opacity-30'
                    }`}
                    icon={faChevronDown}
                    size='2xl'
                    onClick={() => {
                        if (activeIndex < activeCount - 1) scrollTo(activeIndex + 1);
                    }}
                />
            </div>
        </div>
    );
}
