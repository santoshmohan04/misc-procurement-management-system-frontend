import React from "react";
import { Facebook, Instagram, Youtube, Twitch } from "react-bootstrap-icons";
import "../assets/css/Navigation.css";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="flex-1 min-w-[220px]">
            <h5 className="uppercase font-semibold text-white mb-2">The Children Cloud</h5>
            <p className="text-sm mb-3">Your Child Our Responsibility..</p>
            <span className="flex gap-2">
              <Facebook size={24} />
              <Instagram size={24} />
              <Youtube size={24} />
              <Twitch size={24} />
            </span>
          </div>

          <hr className="w-full border-gray-600 sm:hidden" />

          <div className="min-w-[160px]">
            <h5 className="uppercase font-semibold text-white mb-2">Terms &amp; Policies</h5>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              <li>Policies</li>
              <li>Terms of Use</li>
              <li>Code of Conduct</li>
              <li>Privacy</li>
            </ul>
          </div>

          <div className="min-w-[160px]">
            <h5 className="uppercase font-semibold text-white mb-2">Support</h5>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              <li>About Us</li>
              <li>Help</li>
              <li>Advisories</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center py-3 mt-6 border-t border-gray-700 text-sm text-gray-400">
        © 2022 Copyright: children cloud team
      </div>
    </footer>
  );
}
export default Footer;
