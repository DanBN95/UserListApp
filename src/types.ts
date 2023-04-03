export type FullNameType = {
    title: string;
    fisrt: string;
    last: string;
}

export type LocationType = {
    street: {
        number: number;
        name: string
    },
    city: string;
    country: string;
}

export type PictureType = {
    large: string;
    medium: string;
    thumbnail: string;
}

export type UserCardType = {
    id?: string;
    name: FullNameType,
    location: LocationType,
    picture: Pick<PictureType, "medium">
}

export interface SearchBarInterface {
    filter: (str: string) => void;
}