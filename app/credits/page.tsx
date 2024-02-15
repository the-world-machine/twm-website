'use client'
import Desktop from "../components/desktop";
import Window from "../components/window"

function Title({children} : {children: React.ReactNode}) {
    return(
        <div className="text-3xl text-black text-center">
            {children}
        </div>
    )
}

function Header({children} : {children: React.ReactNode}) {
    return(
        <div className="text-xl mt-4 text-twm-logo-bg-light text-center">
            {children}
        </div>
    )
}

function Text({children} : {children: React.ReactNode}) {
    return(
        <div className="text-lg mt-3 mx-auto max-w-[500px] text-black text-center">
            {children}
        </div>
    )
}

export default function Page() {
    return(
        <Desktop>
            <Window title='Credits :)' className="max-w-[600px]">
                <Title>Credits</Title>
                
                <Header>Created by</Header>
                <Text>Axiinyaa</Text>

                <Header>Contributors</Header>
                <Text>Textbox Implementation + Testing - RedstoneRuler</Text>
                <Text>Testing + Github Contributions - Hakase</Text>

                <Header>Localization</Header>
                <Text>Russian - Mr. Saturn</Text>

                <div className="mt-5"/>

                <Text>And of course, the OneShot team for creating such a wonderful game this bot is based off!</Text>

                <div className="text-lg mt-5 mx-auto max-w-[500px] text-twm-highlight text-center hover:cursor-pointer" onClick={() => {window.location.href = 'https://store.steampowered.com/app/420530/OneShot/'}}>[ Buy OneShot ]</div>
            </Window>
        </Desktop>
    )
}