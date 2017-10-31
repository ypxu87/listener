
export function updatePlayerData(data) {
    return {
        type:"ADD_DATA_TO_PLAYER",
        data
    }
}
export function changePlayerStatus(status) {
    return {
        type:"CHANGE_PLAYER_STATUS",
        status
    }
}

export function updatePlayerTrackValue(trackValue) {
    return {
        type:"UPDATA_PLAYER_TRACK_VALUE",
        trackValue
    }
}

export function playerOnload(data) {
    return {
        type:"UPDATA_PLAYER_ON_LOAD",
        duration:data.duration,
        time:data.time
    }
}