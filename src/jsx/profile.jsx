import React from "react";

class Profile extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            openAchievList: null,
            perfectGames: [],
            user: {}
        }
    }

    componentDidMount() {
        this.getPlayerInfo()
        this.getPlayerGameInfo()
    }

    async getPlayerGameInfo() {
        var info = await fetch('http://localhost:5000/requests/getPlayerGames/76561198087187001').then(res => res.json())
        var perfectGames = []

        info.map((value) => {
            var achievements = []

            value.achievements.map((achievInfo) => {
                achievements.push({
                    name: achievInfo.name,
                    icon: achievInfo.icon,
                    description: achievInfo.description,
                    unlocktime: achievInfo.unlocktime
                })
            })

            perfectGames.push({
                id: value.id,
                game: value.game,
                playtime: value.playtime,
                achievements
            })
        })

        this.setState({perfectGames})
    }

    async getPlayerInfo() {
        var info = await fetch('http://localhost:5000/requests/getUserInfo/76561198087187001').then(res => res.json())

        var user = {
            steamid: info.players[0].steamid,
            avatarfull: info.players[0].avatarfull,
            personname: info.players[0].personname
        }

        this.setState({user})
    }

    showGameAchievements(id) {
        console.log('oi', id, this.state.openAchievList)

        if (this.state.openAchievList === id) {
            document.getElementById(this.state.openAchievList).classList.add('js-hide-achievements')

            this.setState({
                openAchievList: null
            })
        }
        else {
            document.getElementById(id).classList.remove('js-hide-achievements')
            
            if (this.state.openAchievList) {
                document.getElementById(this.state.openAchievList).classList.add('js-hide-achievements')
            }

            this.setState({
                openAchievList: id
            })
        }
    }

    render() {
        return (
            <div className="profile-background">
                <img src='https://cdn.cloudflare.steamstatic.com/steam/apps/2258500/library_hero.jpg' alt='' className="profile-banner"/>
                <div className="profile-header">
                    <img src={this.state.user.avatarfull} alt={this.state.user.personname} className="profile-header__avatar"/>
                    <p className="profile-header__name">{this.state.user.personname}</p>
                </div>
                <div className="profile-body">
                    <div className="profile-card">
                        <p className="profile-card__title">Perfect Games</p>
                        {this.state.perfectGames.map((value, index) => 
                            <div className="game-card" style={{backgroundImage: `var(--gradient__game-card), url(https://cdn.cloudflare.steamstatic.com/steam/apps/${value.id}/library_hero.jpg)`}}>
                                <div className="game-info">
                                    <p className="game-info__title test">{value.game}</p>
                                    <div className="game-info__dropdown">
                                        <button className="game-info__dropdown--btn" onClick={() => this.showGameAchievements(`achievList-${index}`)}>
                                            <img src={require("../assets/icons/chevron-down-solid.svg").default} alt="" className="game-info__dropdown--icon"/>
                                        </button>
                                    </div>
                                </div>
                                <div id={`achievList-${index}`} className="game-details js-hide-achievements">
                                    <div className="game-details__box">
                                        <div className="game-details__title">
                                            <p className="test">Progress</p>
                                            <p className="test">Achievements</p>
                                        </div>
                                        <div className="game-details__achievements">
                                            {value.achievements.map((achiev) => 
                                                <img src={achiev.icon} alt={achiev.title} className="game-details__achievements--icon"/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;