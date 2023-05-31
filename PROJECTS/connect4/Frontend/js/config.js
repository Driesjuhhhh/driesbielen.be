// export const BACKEND_URL = "https://localhost:5001/api/";
// export const BACKEND_URL = "https://v7zl3h3m-5001.euw.devtunnels.ms/";
export const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";
//https://localhost:5001/api/

let url;
if (localStorage.getItem("backendUrl") === null || localStorage.getItem("backendUrl").length == 0){
    url = "https://z1875282-5001.euw.devtunnels.ms/api/"
} else {
    if (localStorage.getItem("backendUrl").endsWith("/api/")){
        url = localStorage.getItem("backendUrl")
    } else {
        url = localStorage.getItem("backendUrl") + "api/";
    }
}

export const BACKEND_URL = url;