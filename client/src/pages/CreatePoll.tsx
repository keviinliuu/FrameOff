import { useEffect, useState } from 'react';
import { useSlideStore } from '../stores/useSlideStore';

import CreateSlides from '../components/creation/CreateSlides';
import PollInfo from '../components/creation/PollInfo';
import Logo from '../components/elements/Logo';

export default function CreatePoll() {
    const [pollTitle, setPollTitle] = useState('');
    const [pollDescription, setPollDescription] = useState('');
    const setTitleAndDesc = useSlideStore(state => state.setTitleAndDesc);
    const [finishPoll, setFinishPoll] = useState(false);

    useEffect(() => {
        setTitleAndDesc(pollTitle, pollDescription);
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            return (event.returnValue =
                "Are you sure you want to leave? Your changes won't be saved!");
        };

        if (!finishPoll) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [pollTitle, pollDescription]);

    const scrollToCreateSlides = () => {
        document.getElementById('CreateSlides')!.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='flex flex-col items-center snap-y snap-mandatory h-screen w-screen overflow-x-hidden'>
            <Logo />
            <PollInfo
                setTitle={setPollTitle}
                setDescription={setPollDescription}
                onContinue={scrollToCreateSlides}
            />
            {
                <div hidden={!pollTitle} id='CreateSlides'>
                    <CreateSlides pollTitle={pollTitle} setFinishPoll={setFinishPoll} />
                </div>
            }
        </div>
    );
}
