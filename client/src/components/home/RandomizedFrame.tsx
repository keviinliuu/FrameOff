import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import {
    faCat,
    faDog,
    faClover,
    faQuestion,
    faToriiGate,
    faMapLocationDot,
    faPalette,
    faOtter,
    faVihara,
    faSnowman,
    faPizzaSlice,
    faPeopleGroup,
    faMeteor,
    faFutbol,
    faFire,
    faFaceSmileWink,
    faFaceLaughSquint,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
4;

export default function RandomizedFrame() {
    const [randomIcon, setRandomIcon] = useState<IconDefinition | null>(null);

    useEffect(() => {
        const icons = [
            faCat,
            faDog,
            faClover,
            faQuestion,
            faToriiGate,
            faMapLocationDot,
            faPalette,
            faOtter,
            faVihara,
            faSnowman,
            faPizzaSlice,
            faPeopleGroup,
            faMeteor,
            faFutbol,
            faFire,
            faFaceSmileWink,
            faFaceLaughSquint,
        ];

        let v = Math.random();
        v *= icons.length;
        console.log('random num ' + v);

        setRandomIcon(icons[Math.floor(v)]);
    }, []);

    return (
        <div className='relative justify-center flex flex-col h-[32vw] md:h-[17vw]'>
            <svg
                className='relative flex flex-col h-full'
                viewBox='0 0 240 288'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M240 0H0V288H240V0ZM226.286 13.7144H13.7148V226.286H226.286V13.7144Z'
                    fill='#FFADE7'
                />
            </svg>
            {randomIcon !== null && (
                <FontAwesomeIcon
                    icon={randomIcon!}
                    className='absolute bottom-[35%] h-[50%] self-center text-blush'
                />
            )}
        </div>
    );
}
