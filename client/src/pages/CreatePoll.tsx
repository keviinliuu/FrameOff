import { useSlideStore } from '../stores/useSlideStore';

export default function CreatePoll() {
    const slides = useSlideStore(state => state.slides);
    const handleSubmit = () => {
        console.log('submitted, for now.');
    };

    return <div></div>;
}
