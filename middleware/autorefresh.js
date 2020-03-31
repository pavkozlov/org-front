
// import Cookies from 'js-cookie';

// export default function ({ store, route, redirect, app }) {



//     const { $axios } = app

//     let accessToken = Cookies.get('accessToken')
//     let refreshToken = Cookies.get('refreshToken')

//     if (accessToken != undefined && refreshToken != undefined) {

//         let expired = (decodeToken(accessToken).expired - Date.now() / 1000)

//         if (expired <= 3000) {
//             $axios.post("/user/refresh", { "refreshToken": refreshToken })
//                 .then(resp => {
//                     Cookies.set("accessToken", "Bearer " + resp.data.accessToken);
//                     Cookies.set("refreshToken", resp.data.refreshToken, { expires: 60 });

//                     $axios.setHeader(
//                         "Authorization",
//                         "Bearer " + resp.data.accessToken
//                     );
//                 })
//         }
//     }

// }



// function decodeToken(str) {
//     str = str.split('.')[1]

//     str = str.replace('/-/g', '+')
//     str = str.replace('/_/g', '/')
//     switch (str.length % 4) {
//         case 0:
//             break
//         case 2:
//             str += '=='
//             break
//         case 3:
//             str += '='
//             break
//         default:
//             throw new Error('Invalid token')
//     }

//     str = (str + '===').slice(0, str.length + (str.length % 4))
//     str = str.replace(/-/g, '+').replace(/_/g, '/')

//     str = decodeURIComponent(escape(Buffer.from(str, 'base64').toString('binary')))

//     str = JSON.parse(str)
//     return str
// }