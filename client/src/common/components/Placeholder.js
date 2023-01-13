const PlaceHolder = ({btnColor}) => {
    return (<div className="row mx-0 justify-content-center">
        <div className="col-md-3 col-12 card mx-3 shadow-lg p-3 mb-5" aria-hidden="true">
            <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <button tabIndex="-1" className={`btn btn-${btnColor} disabled placeholder col-6`}></button>
            </div>
        </div>
        <div className="col-md-3 col-12 card mx-3 shadow-lg p-3 mb-5" aria-hidden="true">
            <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <button tabIndex="-1" className={`btn btn-${btnColor} disabled placeholder col-6`}></button>
            </div>
        </div>
        <div className="col-md-3 col-12 card mx-3 shadow-lg p-3 mb-5" aria-hidden="true">
            <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" className="card-img-top placeholder-glow" alt="..." />
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <button tabIndex="-1" className={`btn btn-${btnColor} disabled placeholder col-6`}></button>
            </div>
        </div>
    </div>)
}

export default PlaceHolder;