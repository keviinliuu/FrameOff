import Heading from '../components/Heading';
import Logo from '../components/Logo';
import '../index.css';

export default function LandingPoll() {
    return (
        <div className='h-full bg-midnight'>
            <div className='flex justify-center'>
                <Logo />
            </div>

            <div className='flex flex-col items-center pt-24'>
                <Heading textColor='text-blush' fontSize='text-5xl' textAlign='text-center'>
                    Slide, Vote, Repeat.
                </Heading>
            </div>
            <div className='flex flex-col items-center pt-8'>
                <Heading textColor='text-white' fontSize='text-1.5xl' textAlign='text-center'>
                Create and share image polls in seconds.
                </Heading>
            </div>
            <div className='flex justify-center pt-12'>
                <button className='flex items-center rounded border-2 border-blush'>
                    <Heading
                        textColor='text-blush'
                        fontSize='text-2xl'
                        padding='py-1/2 px-6'
                        textAlign='text-center'>
                        Create Poll
                    </Heading>
                </button>
            </div>
        </div>
    );
}
