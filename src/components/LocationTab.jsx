
import React from 'react'

const LocationTab = ({ name, handleClick, selectedLocation }) => {
   // console.log(selectedLocation, name)
    const handleOnClick = () => {
        handleClick(name)
    }

    if (selectedLocation === name) {
        return ( 
            <div className='border bg-gray-200 px-2 py-1 text-base rounded-md shadow-sm cursor-pointer' onClick={handleOnClick}>{name}</div>
        );
    }

    return (
        <div className='border  px-2 py-1 text-base rounded-md shadow-sm cursor-pointer' onClick={handleOnClick}>{name}</div>
    );
}

export default LocationTab