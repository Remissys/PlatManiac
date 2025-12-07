import React from "react";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    async validadeSteamId(e) {
        var steamId = null

        if (e.key == 'Enter') {
            var value = e.target.value
            var split = value.split('id/').pop()

            if (split.length > 1) {
                if (split.slice(-1) == '/') {
                    split = split.slice(0, -1)
                }

                var res = await fetch(`http://localhost:5000/requests/validadeUrl/${split}`).then(res => res.json())

                if (res.steamid) {  
                    steamId = res.steamid
                }
                else {
                    steamId = split
                }
            }
            else {
                var res = await fetch(`http://localhost:5000/requests/validadeUrl/${value}`).then(res => res.json())

                if (res.steamid) {
                    steamId = res.steamid
                }
                else {
                    steamId = value
                }
            }

            window.location.href = `/profile/${steamId}`
        }
    }

    render() {
        return (
            <div className="home">
                    <img src={require("../assets/platmaniac/logo-no-background.png")} alt="PlatManiac" className="logo"/>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Steam ID" 
                            className="search-bar__input"
                            onKeyDown={(e) => {this.validadeSteamId(e)}}
                        ></input>
                    </div>
            </div>                
        )
    }
}

export default Home;