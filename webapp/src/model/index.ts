export interface UserInfoModel {
    userId: number
    userName: string,
}

/* #region Book */
export interface BookFilterModel {
    name: string,
    fromReleaseDate: string,
    toReleaseDate: string,
    paseSize: number,
    page: number
}

export interface BookInfoModel {
    url: string,
    name: string,
    authors: [],
    numberOfPages: number,
    country: string,
    released: Date | null,
    characters: []
    publisher: string,
    mediaType: string
}

export interface BookResponseModel {
    ListBookData: BookInfoModel[]
}
/* #endregion Book */

/* #region Character */
export interface CharacterFilterModel {
    name: string,
    gender: string,
    culture: string,
    born: string,
    died: string,
    isAlive: boolean,
    paseSize: number,
    page: number
}

export interface CharacterInfoModel {
    url: string,
    name: string,
    gender: string,
    culture: string,
    born: string,
    died: string,
    titles: []
    aliases: []
    father: string,
    mother: string,
    playedBy: []
}

export interface CharacterResponseModel {
    ListCharacterData: CharacterInfoModel[]
}
/* #endregion Character */

/* #region House */
export interface HouseFilterModel {
    name: string,
    region: string,
    hasTitles: boolean,
    words: string,
    paseSize: number,
    page: number
}

export interface HouseInfoModel {
    url: string,
    name: string,
    region: string,
    coatOfArms: string,
    words: string,
    overlord: string,
    titles: []
    seats: []
    swornMembers: []
}

export interface HouseResponseModel {
    ListHouseData: HouseInfoModel[]
}
/* #endregion House */