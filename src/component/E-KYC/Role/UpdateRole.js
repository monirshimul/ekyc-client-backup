import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class UpdateRole extends Component {
    state = {
        pendingList: []
    }

    async componentDidMount() {

        const Obj = { status: "A" };
        let url = 'http://127.0.0.1:3001/role/get/';
        let res = await axios.post(url, Obj);
        this.setState({
            pendingList: res.data.data
        })
        //console.log("All Data", this.state.pendingList.data)

    }

    // async componentDidUpdate() {
    //     const Obj = { status: "A" };
    //     let url = 'http://127.0.0.1:3001/role/get/';
    //     let res = await axios.post(url, Obj);
    //     this.setState({
    //         pendingList: res.data.data
    //     })
    // }


    onUpdate = async (id) => {
        try {
            //console.log("id", id)
            let url = 'http://127.0.0.1:3001/role/get/';
            let obj = {
                id: id

            }
            let res = await axios.post(url, obj)
            //console.log(res.data.data)
            let data = res.data.data
            console.log(data)

            let roleData = {
                id: data[0].id,
                status: data[0].status,
                roleName: data[0].roleName,
                description: data[0].description,
                grantedIPList: data[0].grantedIPList,
                rolePrivileges: data[0].rolePrivileges

            }
            console.log("All Role Data", roleData)

            this.props.history.push("/dashboard/update-role-details", roleData)
        } catch (error) {
            // let { reason } = error.response.data

            // alert(reason.map(v => (
            //     JSON.stringify(Object.values(v.constraints))
            // )))
        }



    }
    onReject = async (id) => {
        console.log("id", id)
        let url = 'http://127.0.0.1:3001/role/status';
        let data = {
            id: id,
            status: "R"
        }
        let res = await axios.put(url, data)
        console.log(res.data)

    }





    render() {
        const { pendingList } = this.state


        return (
            <div className="col-sm-12" >


                <div className="d-flex justify-content-center">
                    <div className="card col" style={{ padding: "25px" }}>
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                Search Role
                        </h5>
                        </div>
                        <div className="card-body d-flex justify-content-center">
                            <form className="col-sm-8">
                                <div className="form-group " >
                                    <label htmlFor=""></label>
                                    <input style={{ borderRadius: "50px" }} name="roleName" type="text" className="form-control" placeholder="Search by Id / Role Name / Status" />
                                    <small className="text-muted pl-2">
                                        <span style={{ color: "#39c12a", fontSize: "14px" }}>*</span> Chosse any option from below for searching.
                            </small>
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} >

                                        <input
                                            type="checkbox"
                                            name=""
                                            checked=""
                                            className="custom-control-input"
                                            style={{ marginRight: "5px" }}
                                            value=""
                                            style={{ cursor: "pointer" }}
                                            id="one"
                                        />
                                        <label className="custom-control-label" for="one">Search By ID</label>

                                    </div>
                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} >

                                        <input
                                            type="checkbox"
                                            name=""
                                            checked=""
                                            className="custom-control-input"
                                            style={{ marginRight: "5px" }}
                                            value=""
                                            style={{ cursor: "pointer" }}
                                            id="one"
                                        />
                                        <label className="custom-control-label" for="one">Search By Status</label>

                                    </div>
                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} >

                                        <input
                                            type="checkbox"
                                            name=""
                                            checked=""
                                            className="custom-control-input"
                                            style={{ marginRight: "5px" }}
                                            value=""
                                            style={{ cursor: "pointer" }}
                                            id="one"
                                        />
                                        <label className="custom-control-label" for="one">Search By Role Name</label>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-center pt-2" >
                                    <button className="b" >Search</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

                {/* <table className="table table-hover mt-5" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)" }}>
                    <thead>

                        <tr className="text-center text-muted im">

                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>ID</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>RoleName</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>Description</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>IP List</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>Features</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>Status</th>
                            <th scope="col" style={{ fontSize: "17px" }}>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {pendingList.map((value, index) => (
                            <tr key={index} className="text-center" style={{ padding: "10px" }}>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.id}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.roleName}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.description}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.grantedIPList.map(v => v + ", ")}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.rolePrivileges.map(v => v[1] + ", ")}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.status === "P" ? "Pending" : value.status}</td>
                                <td style={{ fontSize: "14px" }}>
                                    <div className="d-flex">
                                        <span className="sbtn" onClick={() => this.onUpdate(value.id)}>Update</span>
                                        <span className="sbtnx" onClick={() => this.onReject(value.id)}>Archive</span>
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table> */}



                <div className="card mt-3">
                    <div className="im">
                        <h5 className="text-muted text-center pt-2">
                            Role List
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex justify-content-center">
                            {
                                pendingList.map((value, index) => (
                                    <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                        <div className="text-center im">
                                            <small className="text-muted"><i class="fas fa-stopwatch"></i> ID : <span>{value.id}</span></small>
                                        </div>
                                        <hr />


                                        <div>
                                            <small className="text-muted"><i class="fas fa-battery-three-quarters"></i> Status : <span>{value.status}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i class="fab fa-mizuni"></i> Role Name : <span>{value.roleName}</span></small>
                                        </div>

                                        <div>
                                            <small className="text-muted"><i class="fas fa-pen-nib"></i> Description : <span>{value.description}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i class="fas fa-digital-tachograph"></i> IP List : <span>{value.grantedIPList.map(v => v + ", ")}</span></small>
                                        </div>
                                        <hr />

                                        <div className="d-flex justify-content-center mt-2">
                                            <span className="sbtn mr-2" onClick={() => this.onUpdate(value.id)}>Update</span>
                                            <span className="sbtnx mr-2" onClick={() => this.onReject(value.id)}>Archive</span>
                                            <span className="sbtnxy" onClick={() => this.onReject(value.id)}>Details</span>
                                        </div>





                                    </div>
                                ))
                            }
                        </div>
                    </div>





                </div>

            </div>
        )
    }
}

export default withRouter(UpdateRole)
