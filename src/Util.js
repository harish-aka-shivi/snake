
export const GAME_STARTED = 1;

export const GAME_FINISHED = 2;

export const bake_cookie = (name, value,date) => {
    let expirey = date instanceof Date ? '; expires='+date : null
    var cookie = [name, '=', JSON.stringify(value), '; domain_.',
     window.location.host.toString(), '; path=/;',expirey].join('');
    document.cookie = cookie;
}

// reads a cookie according to the given name
export const read_cookie = (name) => {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result = result != null ? JSON.parse(result[1]) : [];
    return result;
}

export const delete_cookie = (name) => {
    document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain.',
     window.location.host.toString()].join('');
}