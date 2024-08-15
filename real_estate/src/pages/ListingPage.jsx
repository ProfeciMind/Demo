import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper , SwiperSlide } from "swiper/react";
// import { SwiperCore } from "swiper";
import { Navigation } from "swiper/modules";
import"swiper/css/bundle";
import 'swiper/css/navigation';
import { FaShare } from "react-icons/fa";

function ListingPage() {

  const {listingId} = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    console.log(listingId);
    
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  },[]);
  return <main>
    {loading && <p className="text-center my-7 text-2xl">LOADING.....</p>}
    {error && <p className="text-center my-7 text-2xl">Something went Wrong</p>}
    {listing && !loading && !error && (
        <div>
        <Swiper navigation>
            {listing.imageURL.map((url)=>(
                <SwiperSlide  key={url}>
                    <div className="h-[500px]" style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}}>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full 
                w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare className=" text-slate-500" 
            onClick={()=>{
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(()=>{
                    setCopied(false);
                },2000);
            }} />
        </div>
        {
            copied && (
                <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                Link Copied!
                </p>
            )
        }
        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
            <p>
                {listing.name}-${' '}
                {listing.offer 
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')
                }
                {listing.type==='rent' && '/ month '}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">

            </p>

        </div>

        </div>
    )
    }
    </main>;
}

export default ListingPage;
