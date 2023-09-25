import React from 'react'

const ESpinner = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="spinner-grow text-success me-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default ESpinner