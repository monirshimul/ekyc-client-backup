import React, { Component } from 'react'
import axios from 'axios'

class ApproveRole extends Component {
    state = {
        pendingList: []
    }

    async componentDidMount() {

        const Obj = { status: "P" };
        let url = 'http://127.0.0.1:3001/role/get/';
        let res = await axios.post(url, Obj);
        this.setState({
            pendingList: res.data.data
        })
        //console.log("All Data", this.state.pendingList.data)

    }

    async componentDidUpdate() {
        const Obj = { status: "P" };
        let url = 'http://127.0.0.1:3001/role/get/';
        let res = await axios.post(url, Obj);
        this.setState({
            pendingList: res.data.data
        })
    }


    onApprove = async (id) => {
        console.log("id", id)
        let url = 'http://127.0.0.1:3001/role/status';
        let data = {
            id: id,
            status: "A"
        }
        let res = await axios.put(url, data)
        console.log(res.data)

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
        //console.log(pendingList)
        // pendingList.map(v => {
        //     // console.log(v.rolePrivileges)
        //     v.rolePrivileges.map(b => {
        //         console.log(b[1])
        //     })
        // })

        return (
            <div className="col-sm-12" >
                <div className="divBg">
                    <h4 className="text-center pt-3">
                        Approve Pending Role
                    </h4>
                </div>

                <table class="table table-hover" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)" }}>
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
                                        <span className="sbtn" onClick={() => this.onApprove(value.id)}>Approve</span>
                                        <span className="sbtnx" onClick={() => this.onReject(value.id)}>Reject</span>
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        )
    }
}

export default ApproveRole
