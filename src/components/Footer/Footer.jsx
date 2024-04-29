import React from 'react';
import{AiFillFacebook,AiFillInstagram} from 'react-icons/ai'
import{CgMail} from 'react-icons/cg'
import { Link } from 'react-router-dom';

import './Footer.css'

const Footer = () => {
  return (
        <footer className="footer">
            <div className="d-flex justify-content-between py-4 my-4 border-top text-dark">
              <p>2024 Macrum</p>
              <ul className="list-unstyled d-flex">
                  <li className="ms-3"><Link className="link-dark" href="#"><AiFillFacebook size={50}/></Link></li>
                  <li className="ms-3"><Link className="link-dark" href="#"></Link><AiFillInstagram size={50}/></li>
                  <li className="ms-3"><Link className="link-dark" href="#"></Link><CgMail size={50}/></li>
              </ul>
            </div>
        </footer>
  )
}

export default Footer;