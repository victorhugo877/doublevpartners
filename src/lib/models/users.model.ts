export interface Users {
    iincomplete_results: boolean,
    items: Item[],
    total_count: number
}
export interface Item {
    avatar_url? : string;
    events_url?: string;
    followers_url? : string;
    following_url?: string;
    gists_url? : string;
    gravatar_id?: string;
    html_url? : string;
    id?: number;
    login? : string;
    node_id?: string;
    organizations_url? : string;
    received_events_url?: string;
    repos_url? : string;
    score?: number;
    site_admin? : boolean;
    starred_url?: string;
    subscriptions_url? : string;
    type?: string;
    url? : string;

}

export const DATA_INIT_USER:Item = {
    avatar_url:'',
    events_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    gravatar_id: '',
    html_url: '',
    id: 0,
    login: '',
    node_id: '',
    organizations_url: '',
    received_events_url: '',
    repos_url: '',
    score: 0,
    site_admin: false,
    starred_url: '',
    subscriptions_url: '',
    type: '',
    url: '',
}
export interface FilterUsers {
    q: string,
    page: number,
    per_page: number
}

export interface UserFollowers {
    id:number,
    follow:string,
    login:string
}
export const DATA_USER_FOLLOWERS:UserFollowers = {
    id:0,
    follow:'',
    login:''
}