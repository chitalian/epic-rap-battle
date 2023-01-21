export interface Marker {
    name: string
    time: number // seconds as a floating point, from track start
}

export interface Track {
    uri: string
    markers: Array<Marker>
}

export const BehindBarz: Track = {
    uri: './audio/tracks/behindbarz.m4a',
    markers: []
}

export const Conway: Track = {
    uri: './audio/tracks/conway.m4a'
}

export function findMarker(track: Track)

export function playTrack(track: Track) {

}
