import { useSlideStore } from '../stores/useSlideStore.ts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

import Logo from '../components/elements/Logo'
import StartPoll from '../components/voting/StartPoll'
import ViewSlides from '../components/voting/ViewSlides'

export default function VotePoll() {
    const { _id } = useParams();
    const loadPoll = useSlideStore(state => state.loadPoll)

    useEffect(() => {
        if(_id !== undefined) {
            loadPoll(_id);
        }
    }, []);

    return (
        <div className='flex flex-col items-center snap-y snap-mandatory h-screen w-screen overflow-x-hidden'>
            <Logo />
            <StartPoll/>
            <ViewSlides/>
        </div>
    )
}