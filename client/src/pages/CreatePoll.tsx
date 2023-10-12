import CreateSlides from '../components/CreateSlides';
import LandingPoll from '../components/LandingPoll';
import PollInfo from '../components/PollInfo';
import { CE } from '../data/types';

export default function CreatePoll() {
    return (
        <div className='flex flex-col items-center snap-y snap-mandatory h-screen w-screen overflow-x-hidden'>
            <LandingPoll />
            <PollInfo
                handleTitle={(e: CE) => {
                    console.log(e);
                }}
                handleDescription={(e: CE) => {
                    console.log(e);
                }}
            />
            <CreateSlides />
        </div>
    );
}
