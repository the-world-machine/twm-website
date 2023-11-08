import { useState } from "react";
import { Background } from "./database-parse-type";

export function SelectOption({ background, currentlySelected, onChange }: { background: Background, currentlySelected: number, onChange: (value: number) => void }) {

    const OnSelection = () => {
        onChange(background.p_key);
    }
}