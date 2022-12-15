import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EachUser from './EachUser';
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DisplaySpinner from '../../../../components/Sprinners/DisplaySpinner/DisplaySpinner';

const AllUser = () => {

    const { user, loading, setLoading } = useContext(AuthContext);
    const [users, setUsers] = useState([])
    // const url = `http://localhost:5000/users`;

    // const { data: users = [], isLoading, refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(url, {
    //             headers: {
    //                 authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    //             }
    //         });
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    useEffect(() => {
        fetch('http://localhost:5000/users')

            .then(res => res.json())
            .then(data => {
                setLoading(true)
                setUsers(data);
                console.log(data)
                setLoading(false)
            });

    }, [])

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    const handleToDelete = (user) => {
        console.log(`${user?.userName} deleted successfully`)
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`${user.name} deleted successfully`)
                    const newUsers = users?.filter(usr => usr._id !== user?._id);
                    setUsers(newUsers);
                }
                console.log(data);

            })
    }
    // const handleMakeAdmin = id => {
    //     fetch(`http://localhost:5000/users/admin/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.modifiedCount > 0) {
    //                 toast.success('Make admin successfully');
    //                 refetch();
    //             }
    //         })

    // }

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }
    return (


        <div>
            <h2 className="text-3xl text-lime-500 font-bold mb-5">
                Available user In your site .......
            </h2>


            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>User Name / Type</th>
                            <th>email</th>
                            <th>Register date</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {users?.length !== 0 && users?.map(user =>
                        <EachUser
                            user={user}
                            key={user._id}
                            handleToDelete={handleToDelete}
                        // handleMakeAdmin={handleMakeAdmin}
                        ></EachUser>
                    )}

                </table>
            </div>
        </div>
    );
};

export default AllUser;