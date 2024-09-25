import GestionPedidos from "../components/pages/gestionPedidos/GestionPedidos"
import InfoPedidos from "../components/pages/InfoPedidos/InfoPedidos"

export const routes = [
    {
        id: "gestionPedidos",
        path: "/gestionPedidos",
        Element: GestionPedidos,
    },
    {
        id: "infoPedidos",
        path: "/InfoPedidos",
        Element: InfoPedidos,
    }
]