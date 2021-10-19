import React from 'react'
import logo from '../../static/images/logo.jpg'

// import Image from 'next/image'

function Footer() {
    return (
      <footer>
        <div className="footer">
          <span>Copyright © {new Date().getFullYear()}</span>&nbsp;&nbsp;
          <img src={logo} alt="logo" width="28px" height="28px" />
        </div>
      </footer>
    )
}

export default Footer
