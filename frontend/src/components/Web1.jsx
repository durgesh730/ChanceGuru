import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import logo from "../assets/images/logo1.svg";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("login")) {
            if(localStorage.getItem("type") === "user"){

                navigate("/talentdashboard");
            }
            else{
                
                navigate("/seekerdashboard");
            }
        }
        else { navigate("/"); }
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
                                <Link to="/signup" state={{ talent: true }} >
                                    <button className="btn btn-talents">Sign up as Talents</button>
                                </Link>
                                <Link to="/signup" state={{ talent: false }}>
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
                                        <img src="https://i.pinimg.com/736x/a7/1a/18/a71a18e3339c8b0f12e3dc9f62466c21.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Rachel Zayne</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://st1.bollywoodlife.com/wp-content/uploads/2018/07/SalmanKhan.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Salman Khan</div>
                                            <div className="overlay-profession">Actor</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/08/akshay-kumar-1556950313-1597741941.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Akshay Kumar</div>
                                            <div className="overlay-profession">Actor</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://www.easterneye.biz/wp-content/uploads/2019/03/Deepika-Padukone.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Deepika Padukone</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://filmfare.wwmindia.com/content/2019/apr/aliabhatt11554808888.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Alia Bhatt</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://theindianwire.com/wp-content/uploads/2019/09/Mrunal-Thakur3.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Mrunal Thakur</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://4.bp.blogspot.com/_YTxbRMzpLmc/TFqtlAlv_BI/AAAAAAAAB0o/cxZMjPxYMN0/s1600/001+Sonali+Bendre+(2).jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Sonali Bendre</div>
                                            <div className="overlay-profession">Actress</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://movierdo.com/my_para/wp-content/uploads/2015/07/singham-ajay-devgan.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Ajay Devgan</div>
                                            <div className="overlay-profession">Actor</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://www.newszii.com/wp-content/uploads/2017/01/Sushant-Singh-Rajput-V1.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Sushant Singh</div>
                                            <div className="overlay-profession">Actor</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://images.news18.com/ibnlive/uploads/2022/07/untitled-design-101-16583210403x2.png?impolicy=website&width=510&height=356" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Neel Salekar</div>
                                            <div className="overlay-profession">Cinematographer</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src="https://beautyhealthtips.in/wp-content/uploads/2018/03/Hrithik-roshan-1.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Hritik Roshan</div>
                                            <div className="overlay-profession">Dancer</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://i2.cinestaan.com/image-bank/1500-1500/126001-127000/126990.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Tiger Shroff</div>
                                            <div className="overlay-profession">Stunt Man</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://timesofindia.indiatimes.com/thumb/msid-58515457,imgsize-198415,width-800,height-600,resizemode-4/58515457.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Chetan Bhagat</div>
                                            <div className="overlay-profession">Writer</div>
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src="https://filmfare.wwmindia.com/content/2020/jul/director-anurag-kashyap-11595317563.jpg" />
                                        <div className="image_overlay">
                                            <div className="overlay-name">Anurag Kashyap</div>
                                            <div className="overlay-profession">Director</div>
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
