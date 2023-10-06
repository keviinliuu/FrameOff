import CreateSlides from '../components/CreateSlides';
import StartPoll from '../components/StartPoll';
import LandingPoll from '../components/LandingPoll';
import PollInfo from '../components/PollInfo';
import Error from '../components/Error';

export default function CreatePoll() {
    return (
        <div className='snap-y snap-mandatory h-screen w-screen overflow-x-hidden'>
            <LandingPoll />
            <StartPoll />
        </div>
    );
}
