import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {

    const localSavedCatsId = JSON.parse(sessionStorage.getItem("savedCats")) || [];
    const localAdoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];

    const [savedCatsId, setSavedCatsID] = useState(localSavedCatsId ? localSavedCatsId : []);
    const [adoptedCatIds, setAdoptedCatIds] = useState(localAdoptedCatIds? localAdoptedCatIds : []);

    const [buds, setBuds] = useState([]);
    const savedBuds = buds.filter(cat => savedCatsId.includes(cat.id) && !adoptedCatIds.includes(cat.id));
    const availableBuds = buds.filter(cat => !savedCatsId.includes(cat.id) && !adoptedCatIds.includes(cat.id));
    
    const applyBuds = (method, id) => {
        if (method === "save") {
            setSavedCatsID(pre => {
                const newIds = [...pre, id];
                sessionStorage.setItem("savedCats", JSON.stringify(newIds));
                return newIds;
            });
        } else if (method === "remove") {
            setSavedCatsID(pre => {
                const newIds = pre.filter(p => p !== id);
                sessionStorage.setItem("savedCats", JSON.stringify(newIds));
                return newIds;
            })
        } else if (method === "adopted") {
            setAdoptedCatIds(pre => {
                const newIds = [...pre, id];
                sessionStorage.setItem("adoptedCatIds", JSON.stringify(newIds));
                return newIds;
            });
        }
    };

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw5/buds', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats);
            })
    }, []);

    console.log(buds);

    return <div>
        <BadgerBudsNavbar />
        <div style={{ margin: "1rem" }}>
            <BadgerBudsDataContext.Provider value={{availableBuds, applyBuds, savedBuds, savedCatsId}}>
                <Outlet/>
            </BadgerBudsDataContext.Provider>
        </div>
    </div>
}