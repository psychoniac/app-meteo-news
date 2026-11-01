export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white shadow-md py-4 px-6 flex justify-between items-center">
            <div>
                <h3>Web app Météo & News</h3>
                <span>Développée par Jlnko</span>
            </div>
            <div>
                {/* Trouver un logo ou une image */}
            </div>
            <div>
                <ul>
                    <li>
                        <a href="https://github.com/Jlnko" target="_blank" rel="noopener noreferrer">Github</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/jlnko/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/Jlnko" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}