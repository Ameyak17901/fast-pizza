import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/user/Username"

function Header() {
    return (
        <header className="bg-yellow-500  uppercase px-4 py-3 sm:px-6 flex items-center justify-between ">
            <Link to='/' className="uppercase tracking-widest">React Fast Co</Link> 
            <SearchOrder />
            <Username />
        </header>
    )
}

export default Header
