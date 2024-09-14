import React from "react";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            home: true,
            rankings: false,
            comparisons: false,
            logo: require('../assets/platmaniac/logo-no-background.png')
        }

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById('nav').classList.add("js-reduced-nav")
            document.getElementById('logo').classList.add("js-reduced-nav-logo")
        } 
        else {
            document.getElementById('nav').classList.remove("js-reduced-nav")
            document.getElementById('logo').classList.remove("js-reduced-nav-logo")
        }
    }

    render(){
        return (
            <div className="nav">
                <div id='nav' className="nav__body">
                    <div id='logo' className="nav__logo">
                        <a href="/">
                            <img src={require("../assets/platmaniac/logo-no-background.png")} alt="PlatManiac" className="nav__logo--img"/>
                        </a>
                    </div>
                    <div className="nav__menu">
                        <div className="nav__menu__options" onClick={() => window.location.href="/"}>home</div>
                        <div className="nav__menu__options" onClick={() => window.location.href="/profile/76561198087187001"}>profile</div>
                        {/* <div className="nav__menu__options">rankings</div>
                        <div className="nav__menu__options">comparisons</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;