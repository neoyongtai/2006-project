import React from 'react';
import '../css/footer.css';
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {
  return (
    <div className="footer">
      <p><CopyrightIcon style={{ fontSize: 12 }} />United 2020</p>
    </div>
  );
}

export default Footer;
