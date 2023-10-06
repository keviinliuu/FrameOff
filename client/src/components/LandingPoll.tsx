import Heading from '../components/atoms/Heading';
import Logo from '../assets/frameoff-logo.svg';
import '../index.css';

export default function LandingPoll() {
    return (
        <div className='flex flex-col justify-center items-center gap-y-10 h-screen snap-start snap-always '>
            <div className='flex justify-center'>
                <img className='aspect-{25/6} h-10' src={Logo} />
            </div>
            <div className='pt-12'>
                <Heading textColor='text-blush' fontSize='text-8xl' textAlign='text-center'>
                    slide, vote, repeat.
                </Heading>
            </div>
            <Heading
                textColor='text-white'
                fontSize='text-2xl'
                textAlign='text-center'
                fontWeight='font-light'>
                Create and share image polls in seconds.
            </Heading>
            <div className='pt-12'>
                <button className='flex items-center rounded border-2 border-aqua bg-aqua'>
                    <Heading
                        textColor='text-black'
                        fontSize='text-4xl'
                        padding='py-6 px-14'
                        textAlign='text-center'
                        fontWeight='font-normal'>
                        Create Poll
                    </Heading>
                </button>
            </div>
        </div>
    );
}
