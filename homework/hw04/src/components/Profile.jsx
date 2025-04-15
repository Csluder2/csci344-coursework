import React, {useState, useEffect} from "react";
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {

    const [profile, setProfile] = useState([]);
    
        async function getProfile() {
            const data = await getDataFromServer(token, "/api/profile/");
            console.log(data);
            setProfile(data);
        }
    
        useEffect(() => {
            getProfile();
        }, [token]);

    return (
        <header className="flex gap-4 items-center">
        <img src={profile.image_url} alt={profile.image_url} className = "w-20 h-20 object-cover rounded-full" />
        <h2 className="font-Comfortaa font-bold text-2x1">{profile.username}</h2>
        </header>    
            
   
    );
}
