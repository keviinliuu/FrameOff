import { useState } from 'react';
import CreateSlides from '../components/creation/CreateSlides';
import PollInfo from '../components/creation/PollInfo';
import Logo from '../components/elements/Logo';

export default function CreatePoll() {
    const [pollTitle, setPollTitle] = useState('');
    const [pollDescription, setPollDescription] = useState('');
    const [finishInfo, setFinishInfo] = useState(false);

    const handleFinish = (title: string, description: string, finish: boolean) => {
        setPollTitle(title);
        setPollDescription(description);
        setFinishInfo(finish);
    };

    return (
        <div className='flex flex-col items-center snap-y snap-mandatory h-screen w-screen overflow-x-hidden'>
            <Logo />
            <PollInfo handleFinish={handleFinish}/>
            {finishInfo && <CreateSlides pollTitle={pollTitle} pollDescription={pollDescription} />}
        </div>
    );
}
