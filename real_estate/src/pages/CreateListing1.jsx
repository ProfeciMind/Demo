import React from 'react';

function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        {/* Main Form Fields */}
        <div className='flex flex-col gap-4 flex-1'>
          <input 
            type="text" 
            placeholder='Name' 
            className='p-3 border rounded-lg' 
            id='name' 
            maxLength='62' 
            required 
          />
          <input 
            type="text" 
            placeholder='Description' 
            className='p-3 border rounded-lg' 
            id='description' 
            maxLength='62' 
            required 
          />
          <input 
            type="text" 
            placeholder='Address' 
            className='p-3 border rounded-lg' 
            id='address' 
            required 
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sell' className='w-5'/>
              <span>Sell</span>
              <input type='checkbox' id='parking-spot' className='w-5'/>
              <span>Parking Spot</span>
              <input type='checkbox' id='rent' className='w-5'/>
              <span>Rent</span>
              <input type='checkbox' id='furnished' className='w-5'/>
              <span>Furnished</span>
              <input type='checkbox' id='offer' className='w-5'/>
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'> 
            <div className='flex items-center gap-2'>
              <input 
                type='number' 
                id='bedroom' 
                min='1' 
                max='10' 
                required  
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type='number' 
                id='bathroom' 
                min='1' 
                max='10' 
                required  
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Bath</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type='number' 
                id='regularPrice' 
                min='1' 
                max='1000000' 
                required  
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center gap-2'>
                <p>Regular Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type='number' 
                id='discountPrice' 
                min='1' 
                max='1000000' 
                required  
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center gap-2'>
                <p>Discounted Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:</p>
          <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span>
          <div className='flex gap-4'>  
            <input 
              className='p-3 border-gray-300 w-full rounded' 
              type='file' 
              id='image' 
              accept='image/*' 
              multiple 
            />
            <button 
              type="button" 
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-85'
            >
              Upload
            </button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create List</button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
