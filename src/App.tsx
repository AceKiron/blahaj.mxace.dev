import axios from "axios";
import { useEffect, useState } from "react";

import NamePicker from "./NamePicker";
import NoNamesAvailable from "./NoNamesAvailable";

export default function App() {
    const [availableNames, setAvailableNames] = useState([] as string[]);
    const [availableLists, setAvailableLists] = useState([] as string[]);
    const [lists, setLists] = useState([] as string[]);

    useEffect(() => {
        (async()=>{
            const res = (await axios.get("/lists.txt")).data.split("\n");
            setAvailableLists(res);
            setLists(res);
        })();
    }, []);

    useEffect(() => {
        (async()=>{
            setAvailableNames(Array.from(new Set((await Promise.all(lists.map((listUrl) => axios.get(listUrl)))).map((res) => res.data.toLowerCase().split("\n")).flat())).filter((name) => name.trim() != ""));
        })();
    }, [lists]);

    return (
        <>
            <header id="top" />

            <nav className="fixed w-full full z-40 py-5 top-0 bg-(--color-one) text-(--color-two)">
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    🏳️‍⚧️
                    {" "}
                    <a href="https://github.com/AceKiron/blahaj.mxace.dev" target="_blank" className="underline">Blahaj name picker</a>
                    {" "}
                    🦈
                </h1>
            </nav>

            <main className="relative mt-24">
                <div className="my-8 mx-24 flex flex-col justify-center items-center text-(--color-four)">
                    <h2 className="text-lg md:text-xl lg:text-2xl italic">There are currently {availableNames.length} names loaded from {lists.length} different list(s)!</h2>
                    {availableNames.length > 0 ? <NamePicker availableNames={availableNames} /> : <NoNamesAvailable />}
                </div>

                <form className="my-8 mx-24 flex flex-col justify-center items-center text-(--color-four)">
                    {availableLists.map((availableList, key) => (
                        <div>
                            <input type="checkbox" id={`list_${key}`} name={`list_${key}`} value="Formeel" checked={lists.includes(availableList)} onChange={() => {
                                if (lists.includes(availableList)) setLists(lists.filter((list) => list != availableList));
                                else setLists([...lists, availableList]);
                            }} />
                            <label htmlFor={`list_${key}`}>{` ${availableList}`}</label>
                        </div>
                    ))}
                </form>
            </main>
        </>
    );
}