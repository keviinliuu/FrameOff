import { useSlideStore } from '../stores/useSlideStore.ts';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Logo from '../components/elements/Logo';
import StartPoll from '../components/voting/StartPoll';
import ViewSlides from '../components/voting/ViewSlides';

export default function VotePoll() {
    const navigate = useNavigate();
    const { _id } = useParams();
    const loadPoll = useSlideStore(state => state.loadPoll);
    const error = useSlideStore(state => state.error);

    useEffect(() => {
        if (_id !== undefined) {
            loadPoll(_id);
        }
    }, [_id, loadPoll]);

    useEffect(() => {
        if (error) {
            navigate('/error');
        }
    }, [error, navigate]);

    const scrollToViewSlides = () => {
        document.getElementById('ViewSlides')!.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <div className='flex flex-col items-center snap-y snap-mandatory h-screen w-screen overflow-x-hidden'>
            <Logo />
            <StartPoll onStart={scrollToViewSlides}/>
            <div id="ViewSlides">
                <ViewSlides />
            </div>
        </div>
    );
}
