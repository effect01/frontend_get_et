import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {

    render() {
      const { children, triggerLogin, ...props } = this.props
      return (
          <img    onClick={triggerLogin} {...props}

            src="https://cdn.windowsreport.com/wp-content/uploads/2016/10/Google-icon.jpg"
          style={{
            width: '30px',
            height: '30px',
            color: 'black',
            marginTop: 'auto',
            cursor: 'pointer',
          }}>
            {children}
          </img>
      );
    }
}

export default SocialLogin(SocialButton);