import React from 'react'

const BtnSpinner = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='w-6 h-6 border-2 font-bold border-dashed rounded-full animate-spin border-white'></div>
        </div>
    )
}

export default BtnSpinner;
