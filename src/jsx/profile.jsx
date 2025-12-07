import React from "react";
import { useParams } from "react-router-dom";
import { getBanner } from "../helpers/getBanner.js";

function withHook (WrappedComponent) {
    return function(props) {
        const params = useParams()

        return (
            <WrappedComponent {...props} params={params}/>
        )
    }
}

class Profile extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            openAchievList: null,
            perfectGames: [],
            user: {},
            banner: require('../assets/banners/white_banner.jpg')
        }
    }

    componentDidMount() {
        this.getRandomBanner()
        this.getPlayerInfo()
        this.getPlayerGameInfo()
    }

    async getPlayerGameInfo() {
        var info = await fetch(`http://localhost:5000/requests/getPlayerGames/${this.props.params.steamId}`).then(res => res.json())
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
        var info = await fetch(`http://localhost:5000/requests/getUserInfo/${this.props.params.steamId}`).then(res => res.json())

        var user = {
            steamid: info.players[0].steamid,
            avatarfull: info.players[0].avatarfull,
            personname: info.players[0].personname
        }

        this.setState({user})
    }

    getRandomBanner() {
        var banner = getBanner()

        this.setState({
            banner: banner
        }, () => console.log(this.state.banner))
    }

    showGameAchievements(id) {
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
                <img src={this.state.banner} alt='' className="profile-banner"/>
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
                                        <div>
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

export default withHook(Profile);