import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function PaymentButton() {
    const navigate = useNavigate();

    useEffect(() => {
        // getProducts();
    }, [])

    // const getProducts = async () => {
    //     await axios.get(`http://localhost:3001/stripe`)
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error.response);
    //         });
    // }


    const handlePayment = async (event) => {
        event.preventDefault();
        await axios
            .post(
                // `http://localhost:3001/stripe/create-checkout-session`,
                `http://localhost:3001/login`,
                // article,
                // { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response);
                // dispatch({
                //     type: "updateArticles",
                //     payload: {
                //         articles: response.data
                //     }
                // })
                // getArticles();
                // notify("Articulo creado correctamente", toast.success)
                navigate("/")
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    const prueba = async () => {

        await axios
            .post(
                `http://localhost:3001/stripe/create-checkout-session`,
                // article,
                // { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
                console.log(response);
                // dispatch({
                //     type: "updateArticles",
                //     payload: {
                //         articles: response.data
                //     }
                // })
                // getArticles();
                // notify("Articulo creado correctamente", toast.success)
                navigate("/")
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    return (
        <div>
            {/* <form action={() => handlePayment()}>
                <button type="submit">Checkout</button>
            </form> */}
            <button onClick={() => prueba()}>Checkout</button>
        </div>
    )
}
