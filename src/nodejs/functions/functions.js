import { 
    API_KEY,
    GET_PLAYER_SUMMARIES 
} from "../constants/steamApi.js";

export function requestLinkMounting(requestType, steamId=null, appId=null, extraParams=null) {
        
    var requestLink = requestType

    requestLink += 'key=' + API_KEY

    if (steamId && requestType === GET_PLAYER_SUMMARIES) {
        requestLink += '&steamids=' + steamId
    }
    else if (steamId) {
        requestLink += '&steamid=' + steamId
    }

    if (appId) {
        requestLink += '&appid=' + appId
    }

    if (extraParams) {
        for (let key in extraParams) {
            requestLink += '&' + key + extraParams[key]
        }
    }

    return requestLink
}