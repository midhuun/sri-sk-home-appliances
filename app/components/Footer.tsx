import { FiMail } from "react-icons/fi";
import { CiPhone } from "react-icons/ci";
import Link from "next/link";

const Footer = () => {

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">Sri SK Home Appliances</h2>
          <p className="text-sm mt-2">No.8, Gobalasammy Kovil Street,<br /> Ganapathy, Coimbatore - 641006 (SKT Promoters)</p>
          <p className="text-sm mt-1">Store Hours: Mon-Fri, 10 AM - 10 PM</p>
          <p className="text-sm mt-1">Closed on Holidays</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-2">
          <span className="flex items-center space-x-2">
            <FiMail />
            <Link href="mailto:subashkannan@gmail.com" className="hover:underline">subashkannan@gmail.com</Link>
          </span>
          <span className="flex items-center space-x-2">
            <CiPhone />
            <span>+917942677809</span>
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col flex-wrap space-y-2 md:space-y-0 md:space-x-6 md:flex-row">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Terms of Service</Link>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; 2022 SRI SK HOME APPLIANCES . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
