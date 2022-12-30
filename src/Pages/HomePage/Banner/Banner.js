import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../../Assets/img/cricket-2.jpg'

const Banner = () => {
    return (
        //style="background-image:url('https://source.unsplash.com/700x400/?white')"
        <div className="h-screen">
            <div className="flex justify-center  bg-no-repeat  bg-cover h-full md:bg-center" style={{ backgroundImage: `url(${image})` }}
            >
                <div className="flex flex-col items-center ">

                    <div className="flex flex-col justify-center items-center text-center  max-w-7xl   my-8 py-4 px-10">
                        <h1 className=" text-4xl text-gray-200 font-medium tracking-wider ">Welcome to all seller and buyer in our site</h1>
                        <span className="underline underline-offset-2 text-gray-700-mt-3"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; </span>
                        <div className="flex flex-col text-gray-700mt-5">
                            <h1 className="text-4xl md:text-[50px] font-semibold text-amber-400">SSS Shop</h1>
                            <p className="text-xl text-gray-200 mt-2 md:mt-4 tracking-wide">Place to fulfill your hobbies</p>
                        </div>
                        <p className="mt-4 text-lg text-gray-200 md:w-[52%] tracking-wide leading-7 ">This is the place for all seller and buyer, where they can buy and sell their products with reasonable price and also anyone can sell their products here.</p>
                        <div className="space-x-3 mt-6 md:mt-4 text-white">
                            <a href="#"> <i
                                className="fa-brands fa-facebook-f bg-blue-600 hover:text-blue-500 hover:bg-white rounded-full px-3 py-[11px] w-9 h-9 text-center "></i>
                            </a>
                            <a href="#"> <i
                                className="fa-brands fa-twitter bg-blue-600 hover:text-red-500 hover:bg-white rounded-full px-[10px] py-[11px] w-9 h-9 text-center"></i>
                            </a>
                            <a href="#"> <i
                                className="fa-brands fa-linkedin bg-blue-600 hover:text-yellow-500 hover:bg-white rounded-full px-3 py-[11px] w-9 h-9 text-center"></i>
                            </a>
                            <a href="#"> <i
                                className="fa-brands fa-chrome bg-blue-600 hover:text-indigo-600 hover:bg-white rounded-full px-[10px] py-[11px] w-9 h-9 text-center"></i>
                            </a>

                        </div>
                        <div className="flex mt-10 space-x-5">
                            <Link to='/blog'>
                                <button className="bg-white text-blue-900 border-2 border-teal-300 px-6 py-2 hover:brightness-105 font-semibold">Read
                                    More</button>
                            </Link>

                            <Link to="/contact">
                                <button
                                    className="bg-blue-900 text-white border-2 border-white px-6 py-2 hover:brightness-105 font-semibold">Contact
                                    Me</button>
                            </Link>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;