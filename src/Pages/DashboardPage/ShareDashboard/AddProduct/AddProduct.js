import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';
import Moment from 'moment';
import BtnSpinner from '../../../../components/Sprinners/BtnSpinner/BtnSpinner';
const insertTime = new Date().getTime();

const AddProduct = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const formatDate = Moment().format('DD-MM-YYYY');
    const handleSubmit = (event) => {
        const imgHostKey = process.env.REACT_APP_imgbb_key;
        setLoading(true)
        event.preventDefault();
        const name = event.target.name.value;
        const image = event.target.image.files[0];
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const location = event.target.location.value;
        const productName = event.target.productName.value;
        const price = event.target.price.value;
        const condition = event.target.condition.value;
        const quality = event.target.quality.value;
        const description = event.target.description.value;
        const date = formatDate;


        const formData = new FormData();
        formData.append('image', image);



        const url = `https://api.imgbb.com/1/upload?key=70078de6ca48a9e25382bba10bf2e8df`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        name,
                        sellerImg: user.photoURL,
                        image: imgData.data.url,
                        email,
                        location,
                        advertise: false,
                        available: true,
                        phone,
                        productName,
                        price,
                        condition,
                        quality,
                        date,
                        sold: false,
                        description,
                        insertTime
                    }
                    fetch('https://cricket-lover-server-site-main.vercel.app/products', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`product added successfully`)
                            setLoading(false)
                            navigate('/dashboard/myProducts')
                        })
                }
            })
    }




    return (
        <div>
            <h2 className="text-3xl text-lime-400 font-bold mt-12 mb-5">
                Welcome to use this site to sell your product!!!
            </h2>
            <div className="mx-12 p-5 border rounded-lg border-8 text-slate-700 bg-slate-100 shadow-2xl">
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-3 mt-10'>
                    <input name="name" defaultValue={user?.displayName} disabled type="text" placeholder="Your Name" className="input w-full input-bordered" />
                    <input name="email" defaultValue={user?.email} disabled type="email" placeholder="Email Address" className="input w-full input-bordered" />
                    <input name="phone" type="text" placeholder="Seller Phone Number" className="input w-full input-bordered" />
                    <input name="location" type="text" placeholder="Product Location" className="input w-full input-bordered" />
                    <input name="productName" type="text" placeholder="Product Name" className="input w-full input-bordered" />
                    <input name="price" type="number" placeholder="Price" className="input w-full input-bordered" />
                    <div>

                        <input
                            type='file'
                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                            id='image'
                            name='image'
                            accept='image/*'
                            required
                        />
                    </div>
                    {/* <input name="duration" type="text" placeholder="Use Duration in month" className="input w-full input-bordered" /> */}
                    <div className="form-control">
                        <div className="input-group">
                            <select name='condition' className="select select-bordered w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900">
                                <option disabled selected>Pick Product Condition</option>
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="input-group">
                            <select name='quality' className="select select-bordered w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900">
                                <option disabled selected>Pick Product quality Condition</option>
                                <option>All Ok</option>
                                <option>Damage</option>
                                <option>Repair</option>
                            </select>
                        </div>
                    </div>


                    <div >
                        <input name="purchaseDate" defaultValue={formatDate} placeholder="Purchase Date" className="input w-full input-bordered" />
                    </div>
                    <textarea name='description' className="textarea textarea-success col-span-2" placeholder="Product Details"></textarea>
                    <br />
                    <input className='btn btn-accent w-full col-span-2' type="submit" value={loading ? <BtnSpinner></BtnSpinner> : "Add Product"} />
                </form>
            </div >
        </div >
    );
};

export default AddProduct;