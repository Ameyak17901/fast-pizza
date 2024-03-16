import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function Button({children, disabled, to, type, onClick}) {
    // const className='bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full px-4 py-3 hover:bg-yellow-300 transition-colors duraton-300 focus: outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-slate-400 disabled:cursor-not-allowed sm:px-6 sm:py-4'
    
    const base ='bg-yellow-400 uppercase font-semibold text-sm text-stone-800 inline-block tracking-wide rounded-full  hover:bg-yellow-300 transition-colors duraton-300 focus: outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-slate-400 disabled:cursor-not-allowed'
    const styles = {
        primary: base + 'px-4 py-3 md:px-6 md:py-4',
        small: base + 'px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base + 'px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary: 'bg-transparent text-sm uppercase border-2 border-stone-300 font-semibold text-stone-800 inline-block tracking-wide rounded-full  hover:bg-stone-300 hover:text-stone-800 transition-colors duraton-300 focus:text-stone-800 focus: outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:bg-stone-300 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5'
    }

    if(to)
    return <Link to={to} className={styles[type]}>{children}</Link>

    if(onClick){
        return <button onClick={onClick} className={styles[type]}>
            {children}
        </button>
    }
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
