import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Header from "../components/Header";
import axios from 'axios';
import { backendApi } from '../utils/constants';
import LoaderBar from '../components/LoaderBar';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [tokenLoader, setTokenLoader] = useState(true);
  const [apiToken, setApiToken] = useState('');
  const [updatedApiToken,setUpdatedApiToken] = useState('');
  const [tokenModalVisible, setTokenModalVisible] = useState(false);

  // Get user data
  const getUserData = async ()=>{
   await axios
    .get(`${backendApi}users`)
    .then((response) => {
      console.log('getting user details', response)
      setUsers(response.data);
      setLoader(false);
      toast.success('User details found successfully.');
    })
    .catch((error) => {
      console.log(error)
    });
  }

  // Get Token data
  const getTokenData = async ()=>{
    await axios
    .get(`${backendApi}admin/api-token`)
    .then((response) => {
      console.log('getting api token', response)
      setApiToken(response.data);
      setTokenLoader(false);
    })
    .catch((error) => {
      console.log(error)
    });
  }

  // Handle user delete
  const handleUserDelete = (chatId) => {
    axios
      .delete(`${backendApi}users/${chatId}`)
      .then((response) => {
        console.log('delete response', response);
        setUsers(response.data);
        getUserData();
        setLoader(false);
        toast.success('User deleted successfully.');
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const handleOpenUpdateToken =  ()=>{
    setUpdatedApiToken(apiToken);
    setTokenModalVisible(true)
  }

  // Handle update token
  const handleTokenUpdate = () => {
    setTokenModalVisible(false);
    axios
      .post(`${backendApi}admin/api-token`,{ weatherApiKey : updatedApiToken})
      .then((response) => {
        setUsers(response.data);
        getTokenData();
        setLoader(false);
        toast.success('Weather api token updated successfully.');
      })
      .catch((error) => {
        console.log('token update error is here',error)
      });
  };
 

  useEffect(() => {
    getUserData();
    getTokenData();
  }, []);

  return (
    <>
    <Toaster/>
      <Header />
      <div className="row bot-token-div">
        <h4>Weather api key</h4>

        {tokenLoader ? (<>  <LoaderBar />
        </>) : (<><div>
          <div className="bg-light mt-2 p-2">{apiToken}</div>
          <button type="button"
           class="btn btn-dark mt-2 p-2"
            onClick={handleOpenUpdateToken}
                    >Update api key</button>
        </div>
        </>)}
      </div>

      
        {/* Token Update Modal */}
        {tokenModalVisible && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update weather api key</h5>
                  <button
                        type="button"
                        className="btn-close"
                        onClick={() => setTokenModalVisible(false)}
                      ></button>
                </div>
                <div className="modal-body">
                  {/* Input field for entering new API token */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter API Token"
                    value={updatedApiToken}
                    onChange={(e) => setUpdatedApiToken(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setTokenModalVisible(false)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleTokenUpdate}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      <div className="row user-list-div">
        {loader ? (
          <LoaderBar />
        ) : (
          <div className="col-md-12 mt-2">
            {users.length > 0 ? (<>
                        <h4> Users Details </h4>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Chat Id</th>
                    <th>Status</th>
                    <th>Manage User</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username ? (<>{user.username}</>) : (<>No user name</>)}</td>
                      <td>{user.chatId}</td>
                      <td>{user.activated === true ? (<>< div className="btn btn-success">Active</div></>) : (<><>< div className="btn btn-success">not Active</div></></>)}</td>
                      <td><div className="btn btn-danger" onClick={() => handleUserDelete(user.chatId)}>Delete</div></td>

                    </tr>
                  ))}
                </tbody>
              </table> </>     
            ) : (
              <p>No users available.</p>
            )}
          </div>
        )}
      </div>

      
    </>
  );
};

export default AdminDashboard;
