import ShareButton from '../components/ShareButton';
import Heading from '../components/Heading';
import Logo from '../components/Logo';
import '../index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function StartPoll() {
    return (
        <div className='h-full bg-midnight'>
            <div className='flex justify-center'>
                <Logo />
            </div>

            <div className='flex flex-col items-center pt-28'>
                <Heading textColor='text-moonbeam' fontSize='text-2xl' textAlign='text-center'>
                    Time to vote on...
                </Heading>
            </div>

            <div className='flex flex-col items-center pt-5'>
                <Heading textColor='text-blush' fontSize='text-6xl' textAlign='text-center'>
                    My Awesome Image Duel
                </Heading>
            </div>
            <div className='flex flex-col items-center pt-5'>
                <Heading textColor='text-raspberry' fontSize='text-2xl' textAlign='text-center'>
                    Vote on the animals that you think are cuter!
                    <br></br>I put a lot of animals in this one, pandas, cats, and more...
                </Heading>
            </div>
            <div className='flex justify-center pt-12'>
                <button className='flex items-center rounded border-2 border-blush'>
                    <Heading textColor='text-blush' fontSize='text-2xl' padding='py-1/2 px-6' textAlign='text-center'>
                        Start
                    </Heading>
                </button>
            </div>
        </div>
    );
}
