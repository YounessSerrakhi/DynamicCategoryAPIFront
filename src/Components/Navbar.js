import React from 'react'
import { Link } from 'react-router-dom';
import '../style/Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
        <Link to="/addType" className="nav-link">Add Type</Link>
        <Link to="/addProduct" className="nav-link">Add Product</Link>
        <Link to="/catalog" className="nav-link">Catalog</Link>
      </nav>
  )
}
