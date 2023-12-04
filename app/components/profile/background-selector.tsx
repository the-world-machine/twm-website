import { Background } from '../../components/database-parse-type'
import { useState } from 'react'

export default function BackgroundSelection({ ownedBackgrounds, equippedBackground, onChange }: { ownedBackgrounds: Background[], equippedBackground: Background, onChange: (background: Background) => void }) {
    
    const [selectedBackground, setSelectedBackground] = useState(equippedBackground);

    const UpdateBackground = (e: number) => {
        // Get the selected background ID from the event
        const selectedBackgroundID = e;
        
        // Find the selected background object from the ownedBackgrounds array
        const selectedBackground = ownedBackgrounds.find((background) => background.p_key === Number(selectedBackgroundID));
    
        if (selectedBackground) {
            // For example, set the equippedBackground to the selected background
            setSelectedBackground(selectedBackground);
            
            // Call the onChange function with the selected background
            onChange(selectedBackground);
        }
    }
    
    return (
        <div className='grid place-items-center font-main'>

            <h1>Currently Selected: {selectedBackground.name}</h1>

            <img src={selectedBackground.image} alt={selectedBackground.name} width={300} height={0} className='mt-2 mx-5 bg-refuge-light'/>

            <div className='flex overflow-x-auto max-w-[600px] mt-3 rounded-xl bg-refuge-light'>
                {ownedBackgrounds.map((background) => (
                    <img key={background.p_key} className={'hover:cursor-pointer mx-2 my-3' + (background.p_key === equippedBackground.p_key ? ' bg-twm-highlight' : '')} onClick={() => UpdateBackground(background.p_key)} src={background.image} alt={background.name} width={100} height={0}/>
                ))}
            </div>
        </div>
    );
}