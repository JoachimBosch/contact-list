function Form() {
    return ( 
        <>
        <div className="container border rounded" style={{width: '50vw'}}>
            <div className="mt-3 mb-5">
                <h2>Add a new contact</h2>

            </div>
            <div>
            <form>
                <div className="form-group d-flex flex-column align-items-start pb-2">
                    <label className="pb-1" for="fullName">Full Name:</label>
                    <input type="text" className="form-control" id="fullName" aria-describedby="fullName" required/>
                </div>
                <div className="form-group d-flex flex-column align-items-start pb-2">
                    <label className="pb-1" for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" required/>
                </div>
                <div className="form-group d-flex flex-column align-items-start pb-2">
                    <label className="pb-1" for="phone">Phone Number:</label>
                    <input type="text" className="form-control" id="phone" aria-describedby="phoneNumber" required/>
                </div>
                <div className="form-group d-flex flex-column align-items-start pb-2">
                    <label className="pb-1" for="address">Address:</label>
                    <input type="text" className="form-control" id="address" aria-describedby="address" required/>
                </div>
                <div className="mt-3 mb-3 d-flex align-items-center">
                    <button style={{width: '50vw'}} type="submit" className="btn btn-primary px-0">Save contact</button>
                </div>
                <div className="mb-3">
                    Abort mission, go back to contacts list
                </div>
                </form>
            </div>
        </div>
        </>
     );
}

export default Form;