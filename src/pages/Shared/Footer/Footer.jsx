import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="footer p-10 bg-base-200 text-base-content mx-auto">
                <div style={{height:'100px'}} className="w-[200px] mx-auto md:mx-0 mb-6">
                     <img style={{height:'100px'}} src='https://i.ibb.co/2kKMBx1/download.jpg' alt="" />
                     <h2 className="text-orange-400 font-bold text-xl">Yoga School</h2>
                </div>
                <div className="mx-auto md:mx-0 ">
                    <span className="footer-title">About Us</span>
                    <Link to='/classes'>Classes</Link>
                    <Link to='/Instructors'>Instructors</Link>
                </div>
                <div className="mx-auto md:mx-0 ">
                    <span className="footer-title">Socail Links</span>
                    <a className="link link-hover">Face Book</a>
                    <a className="link link-hover">Linkedin</a>
                    <a className="link link-hover">Twitter</a>
                </div>
                <div className="mx-auto md:mx-0 ">
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </div>
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © {currentYear} - All right reserved by Yoga School</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;