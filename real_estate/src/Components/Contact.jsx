import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.useRef}`);
                if (!res.ok) throw new Error("Failed to fetch landlord");
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.error("Error fetching landlord:", error);
            }
        };

        if (listing.useRef) {
            fetchLandlord();
        }
    }, [listing.useRef]);

    // Handle email link generation safely
    const emailLink = landlord 
        ? `mailto:${landlord.email}?subject=Regarding ${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`
        : '#';

    return (
        <>
            {
                landlord && (
                    <div className='flex flex-col gap-2'>
                        <p>
                            Contact <span className='font-semibold'>{landlord.username || 'Unknown'}</span> for
                            <span className='font-semibold'> {listing.name.toLowerCase()}</span>
                        </p>
                        <textarea
                            name='message'
                            id='message'
                            rows="2"
                            value={message}
                            onChange={onChange}
                            placeholder='Enter your message here'
                            className='w-full border p-3 rounded-lg'
                        ></textarea>
                        <a 
                            href={emailLink}
                            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                        >
                            Send Message
                        </a>
                    </div>
                )
            }
        </>
    );
}

export default Contact;
