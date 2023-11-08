import Image from 'next/image'

export default function Footer() {
    return (
        <div className="p-5 bg-black w-full h-30 font-main">
            <div className='mt-3 ml-5 flex justify-evenly'>
                <a href='/terms-and-conditions' className="mx-5 hover:text-twm-sun">Terms and Conditions<br/></a>
                <a href='/privacy-policy' className="mx-5 hover:text-twm-sun">Privacy Policy<br/></a>
                <a href='https://discord.gg/gtfeHfka5h' className="mx-5 hover:text-twm-sun">Support Server<br/></a>
            </div>
         </div>
    )
}