import Image from 'next/image'

export default function CommandPanel({ title, description, image }: { title: string, description: string, image: string }) {

    return (
        <div className='grid place-content-center grid_cols-[120px_1fr] sm:flex bg-twm-logo-bg rounded-xl sm:max-w-[800px] mx-auto h-max mb-5 scale-100 hover:scale-105 transition-transform duration-150'>

            <img src={`/command_examples/${image}.png`} alt={title} className="m-auto place-content-stretch w-[1000px] sm:w-[350px] sm:mx-5 rounded-xl"/>

            <div className='mx-10 mb-10'>
                <h1 className='text-3xl text-twm-sun mt-10'>{title}</h1>
                <p className='text-lg mt-5'>{description}</p>
            </div>
        </div>
    )
}