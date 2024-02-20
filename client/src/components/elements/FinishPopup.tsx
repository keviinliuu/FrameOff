import { MouseEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

interface FinishPopupProps {
    open: boolean;
    onClose: MouseEventHandler<HTMLButtonElement>;
    onFinish: MouseEventHandler<HTMLButtonElement>;
}

export default function FinishPopup({ open, onClose, onFinish }: FinishPopupProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? 'visible bg-black/80' : 'invisible'
            } z-50`}>
            <div
                className={`flex flex-col m-auto w-1/3 h-1/3 bg-midnight rounded-lg border-blush border p-4 transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}>
                <button
                    onClick={onClose}
                    className='transition ease-in-out delay-50 duration-200 hover:scale-110 self-end text-white'>
                    <FontAwesomeIcon icon={faXmark} size='xl' />
                </button>

                <div className='md:text-3xl lg:text-4xl text-center text-blush font-main mt-1 mb-4'>
                    Finished?
                </div>

                <div className='text-2xl text-center text-white font-main px-20'>
                    NOTE: Once you create this poll, you won't be able to go back and make any more
                    changes!
                </div>

                <div className='flex justify-between mt-6 h-auto flex-grow text-2xl'>
                    <button
                        onClick={e => {
                            setIsLoading(true);
                            onFinish(e);
                        }}
                        disabled={isLoading}
                        className='transition ease-in-out delay-150 duration-300 hover:scale-105 bg-blush text-midnight rounded w-1/2 mr-2 pt-1'>
                        {isLoading ? (
                            <div className='animate-spin w-auto h-[1.6rem]'>
                                <FontAwesomeIcon icon={faCircleNotch} />
                            </div>
                        ) : (
                            "I'm done!"
                        )}
                    </button>

                    <button
                        onClick={onClose}
                        className='bg-midnight border-charcoal border-2 text-charcoal rounded w-1/2 ml-2 pt-1 hover:bg-charcoal hover:text-midnight transition-colors'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
