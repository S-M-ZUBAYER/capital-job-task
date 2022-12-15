import React from 'react';
import toast from 'react-hot-toast';

const EachProduct = ({ product, refetch }) => {
    // const handleToAdvertise = (product) => {
    //     fetch(`https://cricket-lover-server-site-s-m-zubayer.vercel.app/product/${product?._id}`, {
    //         method: "PUT",
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             localStorage.setItem('Cricket-Lover', data.token);
    //             refetch();
    //             toast.success('Product updated successfully');
    //         })


    // }
    const handleToDelete = (id) => {
        fetch(`https://cricket-lover-server-site-s-m-zubayer.vercel.app/product/${product._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.productName} deleted successfully`)
                }
                console.log(data);

            })
    }
    refetch();
    return (


        <div class=" overflow-hidden w-full m-4 flex justify-center  shadow-xl bg-cyan-400">

            <div class="flex flex-col md:flex-row items-center justify-center  bg-white rounded-tl-full ">
                <div class="  items-center justify-center flex py-2">
                    <div class="flex flex-col  items-center justify-center ">
                        <div class="flex items-center">
                            <div class="p-1 bg-white rounded-full">

                                <img src={product.image} alt=""
                                    class="rounded-full w-16 h-16" />
                            </div>
                            <div>
                                <div class="font-bold text-stone-500 mx-4">{product.productName}</div>
                                <div class="text-sm font-medium text-stone-500 hover:text-stone-500 mx-4">{product.name}</div>
                                {
                                    product?.available ? <p className="font-medium">Status:<span className="text-green-700"> Available</span></p> : <p>Status: Sold</p>
                                }
                            </div>
                        </div>
                        <div class="text-stone-400 text-sm  m-2 px-8">{product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}</div>
                        <div className="flex justify-between w-full px-2">

                            {
                                product?.available
                                    ?

                                    <button
                                        class=" inline-block rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                    >
                                        {

                                            product?.advertise ?
                                                <span
                                                    class="block rounded-full bg-white px-3 py-1 text-sm font-medium hover:bg-transparent"
                                                >
                                                    Unsold
                                                </span> :
                                                <span
                                                    class="block rounded-full bg-green px-3 py-1 text-sm font-medium hover:bg-transparent"
                                                >
                                                    Unsold
                                                </span>
                                        }

                                    </button>
                                    :
                                    <p className="text-center text-sm px-6 bg-green-500 py-2  rounded-3xl  text-white font-medium">Sold</p>
                            }
                            <button onClick={() => handleToDelete(product._id)}
                                class=" inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                            >
                                <span
                                    class="block rounded-full bg-white px-3 py-1 text-sm font-medium hover:bg-transparent"
                                >
                                    Delete
                                </span>
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>





        // </div>
    );
};

export default EachProduct;