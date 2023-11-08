import Image from 'next/image'

export default function Footer() {
    return (
        <div className="p-5 bg-black w-full h-30 font-main flex">
            <Image src="/icon.png" alt="logo" width={50} height={10} fill={false} className='w-15 h-12 mt-1'/>
            <div className='mt-3 ml-5 flex'>
                <a href='/terms-and-conditions' className="mx-5 hover:text-twm-sun">Terms and Conditions<br/></a>
                <a href='/privacy-policy' className="mx-5 hover:text-twm-sun">Privacy Policy<br/></a>
                <a href='https://discord.gg/gtfeHfka5h' className="mx-5 hover:text-twm-sun">Support Server<br/></a>
            </div>
         </div>
    )
}