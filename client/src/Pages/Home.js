import React from "react";
import user from "./images/user.png";
import gastank from "./images/gas-tank.png";
import { Link } from "react-router-dom";
import HomePageNavbar from "../Components/HomePageNavbar";

export default function Home() {
    return (
        <div className="home">
            <HomePageNavbar head="Login" link="/Login"/>
            <div className="container1">
                <div>
                    <Link to="/Login">
                        <img
                            src={user}
                            alt="..."
                            width="100"
                            height="100"
                            className="img-thumbnail"
                        />
                        <h3>user Login</h3>
                    </Link>
                </div>
                <div>
                    <Link to="/AdminLogin">
                        <img
                            src={gastank}
                            alt="..."
                            width="100"
                            height="80"
                            className="img-thumbnail"
                        />
                        <h3>admin Login</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
}
