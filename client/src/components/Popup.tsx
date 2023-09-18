
export default function Popup() {
    return (
        <div>
            <div
                id='popup-modal'
                tabIndex={-1}
                className='outline-blush outline-4'>
                <div className='relative max-h-full w-full max-w-md'>
                    <div className='relative rounded-lg bg-white shadow dark:bg-midnight'>
                        <div className='p-6 text-center'>
                        <div className='mb-5 text-2xl  text-blush dark:text-blush'>
                                FINISHED?
                            </div>
                            <h3 className='mb-5 text-lg  text-white dark:text-white'>
                                NOTE: Once you create this poll, you won't be able to go back and make any more changes!
                            </h3>
                            <div className="grid gap-4 grid-cols-2 ">
                            <button
                                data-modal-hide='popup-modal'
                                type='button'
                                className='items-center rounded bg-blush px-8 py-2.5 text-center text-sm  text-midnight'>
                                I'm done
                            </button>
                            <button
                                data-modal-hide='popup-modal'
                                type='button'
                                className='rounded-lg border border-slate bg-transparent px-5 py-2.5 text-sm  text-slate'>
                                Cancel
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
