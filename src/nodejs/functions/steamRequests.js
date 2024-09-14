/* Imports */
import { 
    GET_GAME_SCHEMA,
    GET_OWNED_GAMES,
    GET_PLAYER_ACHIEVEMENTS,
    GET_PLAYER_SUMMARIES,
    GET_USER_STATS_FOR_GAME
} from "../constants/steamApi.js";

import {
    requestLinkMounting
} from "./functions.js";

/* Functions */

export async function getUserInfo(userId) {

    userId='76561198087187001'
    
    var link = requestLinkMounting(GET_PLAYER_SUMMARIES, userId)
    
    var info = await fetch(link)
        .then(res => res.json())

    console.dir(info, {depth: null})

    return info.response
}

export async function getPlayerGames(userId) {
    var params = {
        'include_appinfo': 'true',
        'include_player_free_games': 'true'
    }

    var link_owned_games = requestLinkMounting(GET_OWNED_GAMES, userId, null, params)
    var owned_games_info = await fetch(link_owned_games).then(res => res.json())

    var game_ids = []

    owned_games_info.response.games.map((value, index) => {
        return (
            game_ids.push({
                'id': value.appid,
                'playtime': value.playtime_forever
            })
        )
    })

    var game_stats = []

    const res = await Promise.all(

        game_ids.map(async (value) => {
            const res = await getAchievements(value, userId)
           
            return res
        })        
    )
    
    var game_stats = res.filter(item => item !== undefined)
        
    return game_stats
}

async function getAchievements(value, userId) {
    var link_achievements = requestLinkMounting(GET_PLAYER_ACHIEVEMENTS, userId, value.id)
    var achievements_info = await fetch(link_achievements).then(res => res.json())
            
    var perfect = true
    
    if (achievements_info.playerstats.success === true && achievements_info.playerstats?.achievements !== undefined) {
        for (let i in achievements_info.playerstats.achievements) {
            if (achievements_info.playerstats.achievements[i].achieved == false) {
                perfect = false
                break
            }
        }
        
        if (perfect) {            
            var achieve_info = []
            
            var link_achievements_info = requestLinkMounting(GET_GAME_SCHEMA, null, value.id)
            var achieve_schema_info = await fetch(link_achievements_info).then(res => res.json())
            
            achieve_schema_info = achieve_schema_info.game.availableGameStats.achievements
            
            achievements_info.playerstats.achievements.map((valueA, indexA) => {
                return (
                    achieve_info.push({
                        'name': achieve_schema_info[indexA].displayName,
                        'icon': achieve_schema_info[indexA].icon,
                        'description': achieve_schema_info[indexA]?.description ?? '',
                        'unlocktime': valueA.unlocktime
                    })
                )
            })
            
            return({
                'game': achievements_info.playerstats.gameName,
                'id': value.id,
                'playtime': value.playtime,
                'achievements': achieve_info
            }) 
        }
    }
}