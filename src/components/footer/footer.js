import React from 'react'
import './footer.css'
const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer id="footer">
            <div className="col-md-4 d-flex align-items-center">
                <span>© {year} Designed by Mariano Barone</span>
            </div>
        </footer>
    )
}
