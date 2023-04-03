export type FullNameType = {
    title: string;
    first: string;
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

export interface usersSliceType {
    users: UserCardType[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: any;
}