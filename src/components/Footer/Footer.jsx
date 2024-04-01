import './Footer.css';
import GmailLogo from '../../assets/gmail-logo.svg';
import PhoneIcon from '../../assets/phone-icon.svg';

const Footer = () => (
  <div className="footer-container">
    <h4>Library Management System</h4>
    <h3> Crafted By Om Software Services </h3>
    <div>
      <h4>To know about other services</h4>
      Contact us:
      <div className='social-links'>

        <a href="mailto:balodiharshit1907@gmail.com" target='_blank'><img width={40} src={GmailLogo} alt="gmail-logo" /></a> 
        
        <span> mail at</span>
      </div>
      <div className='social-links'>
        <label htmlFor=""><img width={40} src={PhoneIcon} alt="phone-icon" /></label>
        <span> call on +91-9258736537</span>
      </div>
    </div>
    <caption>@All right reserved 2024</caption>
  </div>
);

export default Footer;
