import React from 'react'
import { Link} from 'react-router-dom';

export default function Navbar(){

    return (
      <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" >
              <div className="container-fluid">
                <div className="d-flex">
                <Link className="navbar-brand" to="/">NewsMate</Link>
                </div>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to="/">General</Link>
                    </li>
                    
                    <li className="nav-item">
                      <Link className="nav-link" to="/business">Business</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/entertainment">Entertainment</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/health">Health</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/science">Science</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sports">Sports</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/technology">Technology</Link>
                    </li>
                  </ul>
                </div>
              </div>
             <p  className="p-2"style={{color:"white"}}>Created by - Pretisha_Sahoo</p>
            </nav>
      </div>
      )
}


