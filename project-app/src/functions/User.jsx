import {Cookies} from "react-cookie";

export async function getRole() {
    const cookie = new Cookies();
    const userId = await cookie.get("userId");

    await fetch(`http://localhost:3000/api/user/role/${userId}`)
        .then(data => {
            if (data.role === "docente") {
                return "docente";
            } else {
                return "allievo"
            }
    })
}