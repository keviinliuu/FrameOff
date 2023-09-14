import Heading from '../components/atoms/Heading';
import Logo from '../assets/frameoff-logo.svg';
import '../index.css';

export default function LandingPoll() {
    return (
        <div className='h-full bg-midnight px-80 pt-14'>
            <div className='flex justify-center'>
                <img className='aspect-{25/6} h-10' src={Logo} />
            </div>

            <div className='flex flex-col items-center pt-24'>
                <Heading textColor='text-blush' fontSize='text-5xl' textAlign='text-center'>
                    slide, vote, repeat.
                </Heading>
            </div>
            <div className='flex flex-col items-center pt-8'>
                <Heading
                    textColor='text-white'
                    fontSize='text-1.5xl'
                    textAlign='text-center'
                    fontWeight='font-light'>
                    Create and share image polls in seconds.
                </Heading>
            </div>
            <div className='flex justify-center pt-12'>
                <button className='flex items-center rounded border-2 border-aqua bg-aqua'>
                    <Heading
                        textColor='text-black'
                        fontSize='text-4xl'
                        padding='py-7 px-14'
                        textAlign='text-center'
                        fontWeight='font-normal'>
                        Create Poll
                    </Heading>
                </button>
            </div>
        </div>
    );
}
