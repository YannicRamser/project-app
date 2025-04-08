import {Cookies} from "react-cookie";

export async function getRole() {
    const cookie = new Cookies();
    const userId = cookie.get("userId");

    fetch(`http://localhost:3000/api/user/role/${userId}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data.role === "docente") {
                return "docente";
            } else {
                return "allievo"
            }
    })
}