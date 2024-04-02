import './Footer.css';
import GmailLogo from '../../assets/gmail-logo.svg';
import PhoneIcon from '../../assets/phone-icon.svg';
import LocationPinIcon from '../../assets/location-pin-icon.svg';

const Footer = () => (
  <div className="footer-container">
    <div className='footer-block-container'>

      <div className='footer-block'>
        <h3>Contact us</h3>
        <div className='social-links'>
          <label htmlFor="">
            <a href="mailto:rohit_mechanical@yahoo.com" target='_blank' style={{ margin: '0' }}>
              <img width={30} src={GmailLogo} alt="gmail-logo" />
            </a>
          </label>
          <span>rohit_mechanical@yahoo.com</span>
        </div>
        <div className='social-links'>
          <label htmlFor=""><img width={30} src={PhoneIcon} alt="phone-icon" /></label>
          <span>+91-9258736537</span>
        </div>
        <div className='social-links'>
          <label htmlFor=""><img width={25} src={LocationPinIcon} alt="location-pin" /></label>
          <span> Noida, India</span>
        </div>
      </div>

      <div className='footer-block'>
        <h3>About the company</h3>
        <p>Our company <strong>Om Software Services </strong> was founded in 2023. We are a team of passionate developers and designers. Our goal is to make your experience with us as smooth as possible.</p>
      </div>
    </div>


    <div>@All right reserved 2024</div>
  </div>
);

export default Footer;
