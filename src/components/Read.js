import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUsers } from "../features/userDetailsSlice";

import CustomModal from "./CustomModal";

const Read = () => {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(showUsers());
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {showModal && <CustomModal id={id} setShowPopup={setShowModal} />}
      <h2>All data</h2>
      {/* <input class="form-check-input" name="gender" type="radio" />
      <label class="form-check-label">All</label>
      <input class="form-check-input" name="gender" value="Male" type="radio" />
      <label class="form-check-label">Male</label>
      <input
        class="form-check-input"
        name="gender"
        value="Female"
        type="radio"
      />
      <label class="form-check-label">Female</label> */}

      <div>
        {users &&
          users.map((user) => (
            <div key={user.id} className="card w-50 mx-auto my-2">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">{user.gender}</p>
                <button
                  className="card-link"
                  onClick={() => [setId(user.id), setShowModal(true)]}
                >
                  View
                </button>
                <Link to={`/edit/${user.id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Read;
