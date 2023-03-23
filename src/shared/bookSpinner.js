import React from 'react'
import './booksSpinner.css'

export default function BookSpinner() {
    return (
        <>
            <div class="loader book">
                <figure class="page"></figure>
                <figure class="page"></figure>
                <figure class="page"></figure>
            </div>

            <h1>Reading</h1>
        </>
    )
}
