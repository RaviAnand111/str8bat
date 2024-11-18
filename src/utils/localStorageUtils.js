export function getFromLocalStorage(item) {
    if (typeof window !== "undefined" && localStorage) {
        try {
            const storedData = localStorage.getItem(item);
            if (storedData !== undefined && storedData !== null)
                return JSON.parse(storedData);
            else
                return null;
        }
        catch (err) {
            return null;
        }
    }
}
export function setInLocalStorage(item, data) {
    if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem(item, JSON.stringify(data));
    }
}
export function removeFromLocalStorage(item) {
    if (typeof window !== "undefined" && localStorage) {
        localStorage.removeItem(item);
    }
}
export function clearLocalStorage() {
    if (typeof window !== "undefined" && localStorage) {
        localStorage.clear();
        console.log("local cleard");
    }
}
export function getFromSessionStorage(item) {
    if (typeof window !== "undefined" && sessionStorage) {
        try {
            const storedData = sessionStorage.getItem(item);
            if (storedData !== undefined && storedData !== null) {
                return JSON.parse(storedData);
            }
            else {
                return null;
            }
        }
        catch (err) {
            return null;
        }
    }
}
