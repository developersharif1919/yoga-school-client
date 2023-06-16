import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="footer p-10 bg-base-200 text-base-content">
                <div style={{height:'100px'}} className="w-[200px] mx-auto">
                     <img style={{height:'100px'}} src='https://i.ibb.co/2kKMBx1/download.jpg' alt="" />
                </div>
                <div>
                    <span className="footer-title">About Us</span>
                    <Link to='/classes'>Classes</Link>
                    <Link to='/Instructors'>Instructors</Link>
                </div>
                <div>
                    <span className="footer-title">Socail Links</span>
                    <a className="link link-hover">Face Book</a>
                    <a className="link link-hover">Linkedin</a>
                    <a className="link link-hover">Twitter</a>
                </div>
                <div>
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