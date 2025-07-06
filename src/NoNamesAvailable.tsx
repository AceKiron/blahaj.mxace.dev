export default function NoNamesAvailable() {
    return (
        <>
            <p className="text-md md:text-xl lg:text-2xl italic">
                It appears no names were loaded, so we could not pick one. Sorry...
            </p>
            <p className="text-md md:text-xl lg:text-2xl italic">
                If this message remains visible for an extended period of time, try checking your internet connection and refreshing the page.
            </p>
        </>
    );
}