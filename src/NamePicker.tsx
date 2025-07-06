import { useState } from "react";

function pickRandom(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatName(name: string) {
    return name.split(" ").map((namePart) => namePart.charAt(0).toUpperCase() + namePart.slice(1)).join(" ");
}

export default function NamePicker({availableNames}: {availableNames: string[]}) {
    const [chosenName, setChosenName] = useState(pickRandom(availableNames));

    return (
        <>
            <p className="text-md md:text-xl lg:text-2xl">
                <span className="italic">We have picked the name:</span>
                {" "}
                <span className="font-bold">{formatName(chosenName)}</span>
                <span className="italic">.</span>
            </p>

            <div className="mt-8 py-2 px-6 bg-(--color-three) cursor-pointer select-none" onClick={() => setChosenName(pickRandom(availableNames))}>
                Try again?
            </div>
        </>
    );
}