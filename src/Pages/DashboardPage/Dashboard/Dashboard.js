import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../../Api/Hooks/UseAdmin';
import useBuyer from '../../../Api/Hooks/UseBuyer';
import useSeller from '../../../Api/Hooks/UseSeller';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';
// import useAdmin from '../Hooks/UseAdmin';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    const [isSeller] = useSeller(user?.email)

    const url = `https://cricket-lover-server-site-main.vercel.app/users/${user?.email}`;

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    console.log(users)
    refetch();
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">

                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allUsers'>All Users</Link></li>
                                <li><Link to='/dashboard/allSellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allBuyers'>All Buyers</Link></li>
                            </>
                        }
                        {users?.accountType === "Buyer" && !isAdmin &&
                            <>
                                <li><Link to='/dashboard/orders'>My Orders</Link></li>
                                <li><Link to='/dashboard/wishList'>WishList</Link></li>
                            </>
                        }

                        {users?.accountType === "Seller" && !isAdmin &&
                            <>
                                <li><Link to='/dashboard/addProduct'>Add A product </Link></li>
                                <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                            </>}



                        <Link className="text-left" to='/'>
                            <button className='px-4 py-2 mt-8 ml-0 font-semibold text-base lg:text-lg rounded bg-green-300'>
                                Back to homepage
                            </button>
                        </Link>
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;