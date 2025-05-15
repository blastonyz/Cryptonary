'use client'
import { ethers } from "ethers"
import { useState } from "react"
import Button from "../ui/connect-button/Button"
import MenuIcon from "../ui/icons/MenuIcon"
import Link from "next/link"
import './navbar.css'



const links = [ 
    { 
      label: "Inicio",
    href: "/home"  
    },
    {
      label: "Guia",
      href: "/guide "
    },
    {
      label: "Simulador",
      href: "/guide "
    },
    {
      label: "Noticias",
      href: "/news "
    },
    {
      label: "Nfts",
      href: "/guide "
    },
     {
      label: "Nosotros",
      href: "/us "
    },
]


const Navbar = () => {
    const [account, setAccount] = useState('')
    const [openMenu, setOpenMenu] = useState(false)
    const [chain,setChain] = useState('')

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask no está instalada');
            return;
          }
      
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
      
            setAccount(address);
            console.log("Conectado a:", address);
            console.log('objeto: ',window.ethereum);
            const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
            console.log("Red actual:", currentChainId);
            setChain(currentChainId)
          } catch (error) {
            console.error("Error al conectar:", error);
          }
        };
  
        const menu = ()=>{
          setOpenMenu(!openMenu)
        }

  return (
    <nav className="mainNavbar">

        <button onClick={menu} className="menuIcon">
          <MenuIcon size={48} color={'white'} />
        </button>
        <Button 
        onClick={connectWallet}
        text={ account ? `Conectado: ${account.slice(0, 6)}...` : "Wallet"}
        />
        {
          openMenu && 
          <aside className="collapsableMenu">
            {
              links.map((link,index)=>(
              <Link 
              href={link.href}
              key={index}
              className="navLinks">
               <p className="linksText"> 
                {link.label}
                </p>
              </Link>
              ))
            }
          </aside>
        }
    </nav>
  )
}

export default Navbar;