import { useSlideStore } from '../../stores/useSlideStore.ts';

import Heading from '../elements/Heading';
import '../../index.css';

export default function StartPoll() {
    const pollTitle = useSlideStore(state => state.pollTitle);
    const pollDescription = useSlideStore(state => state.pollDescription);

    return (
        <div className='relative flex flex-col snap-always snap-start min-h-screen w-fit py-20'>
            <div className='flex flex-col items-center pt-28'>
                <Heading textColor='text-moonbeam' fontSize='text-2xl' textAlign='text-center'>
                    Time to vote on...
                </Heading>
            </div>
            <div className='flex flex-col items-center py-10 mt-10'>
                <Heading textColor='text-blush' fontSize='text-8xl' textAlign='text-center'>
                    {pollTitle}
                </Heading>
            </div>
            <div className='flex flex-col items-center py-5 mt-10'>
                <Heading textColor='text-raspberry' fontSize='text-3xl' textAlign='text-center'>
                    {pollDescription}
                </Heading>
            </div>
            <div className='flex justify-center pt-12 mt-5'>
                <button className='rounded-md border-2 border-blush text-blush text-3xl w-32 h-12 pt-0.5 hover:bg-blush hover:text-midnight transition-colors'>
                    Start
                </button>
            </div>
        </div>
    );
}
