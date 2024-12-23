import Link from 'next/link';
import logo from '../assets/logo.jpg';
export default function Footer() {
    return (

        <footer
            className="bg-[#B7B7B7]/5 text-center text-surface/75 lg:text-left">

            
            <div className="bg-black/5 p-6 text-center">
                <span>© 2024 Copyright:</span>
                <a className="font-semibold" href="https://tw-elements.com/"
                >Book Review</a >
            </div>
        </footer>
    );
}
