import React, { useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";

import "./style.css";
import logo from "../assets/images/logo1.svg";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("login")) {
            navigate("/talentdashboard");
        }
    }, [])
    return (
        <>
            <div className="web1">
                <div className="row">
                    <div className="col-4 col">
                        <div className="web1-signin d-flex flex-column justify-content-between">
                            <div className="menu">
                                <div className="Rectangle-1"></div>
                                <div className="Rectangle-2"></div>
                                <div className="Rectangle-3"></div>
                            </div>
                            <div className="text-center">
                                <img src={logo} alt="" className="web1-logo" />
                            </div>
                            <div className="web1-tagline">One Place for Both Talent and Talent Seeker</div>
                            <div className="web1-buttons d-flex flex-column">
                                <Link to="/signup">
                                    <button className="btn btn-talents">Sign up as Talents</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn btn-seekers">Sign up as Seekers</button>
                                </Link>
                            </div>
                            <div className="alternate-option mt-5 text-center">
                                Already have an account{" "}
                                <a href="/login">
                                    <b>
                                        <u>Login</u>
                                    </b>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 col">
                        <div className="web1-images">
                            <div className="grid-container">
                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/2106037/pexels-photo-2106037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/772571/pexels-photo-772571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/3629537/pexels-photo-3629537.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/3673762/pexels-photo-3673762.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/4000421/pexels-photo-4000421.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/2248516/pexels-photo-2248516.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/4555468/pexels-photo-4555468.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/2899100/pexels-photo-2899100.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.pexels.com/photos/3726314/pexels-photo-3726314.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
