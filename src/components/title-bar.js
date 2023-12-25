export default function TitleBar() {
    return (
        <div className="flex flex-row items-center justify-between w-full pb-8">
            <div>
                <p className="text-lg">o&apos;dailyquest .yml generator</p>
                <div>
                    <p>having a problem?</p>
                    <a
                        href="https://github.com/jadeddelta/oquest-builder/issues"
                        className="text-indigo-600 hover:text-indigo-400"
                        target="_blank"
                        rel="noreferrer noopener">
                        submit an issue on github!
                    </a>
                </div>
            </div>
            <div>
                <p>made by jadey the new dev</p>
            </div>
        </div>
    );
}