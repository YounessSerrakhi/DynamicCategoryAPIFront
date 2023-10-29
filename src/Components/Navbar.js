import React from 'react'
import { Link } from 'react-router-dom';
import '../style/Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
        <Link to="/addType" className="nav-link" style={{color: "white"}}>Add Type</Link>
        <Link to="/addProduct" className="nav-link" style={{color: "white"}}>Add Product</Link>
        <Link to="/catalog" className="nav-link" style={{color: "white"}}>Catalog</Link>
      </nav>
  )
}
