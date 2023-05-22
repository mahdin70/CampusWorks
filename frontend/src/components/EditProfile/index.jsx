import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../Footer";
import TopBar from "../TopBar";
import avatar from "../../assets/avatar.png";

const EditProfile = () => {
  const [data, setData] = useState({
    Bio: "",
    Education: "",
    Result: "",
    Strength: "",
    Achievements: "",
    Experience: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [previousPhoto, setPreviousPhoto] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          "http://localhost:8080/api/userProfile",
          config
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prevData) => ({
      ...prevData,
      [name]: value || userProfile[name], // Use previous value if current value is empty
    }));
  };

  const handlePhoto = ({ target }) => {
    const file = target.files[0];
    setData((prevData) => {
      if (file) {
        setPreviousPhoto(prevData.photo || userProfile.photo);
        return {
          ...prevData,
          photo: file,
        };
      } else {
        return {
          ...prevData,
          photo: null,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = "http://localhost:8080/api/userProfile";
    const formData = new FormData();
    formData.append("Bio", data.Bio || userProfile.Bio);
    formData.append("Education", data.Education || userProfile.Education);
    formData.append("Result", data.Result || userProfile.Result);
    formData.append("Strength", data.Strength || userProfile.Strength);
    formData.append("Achievements", data.Achievements || userProfile.Achievements);
    formData.append("Experience", data.Experience || userProfile.Experience);

    if (data.photo) {
      formData.append('photo', data.photo);
    } else {
      formData.append('photo', previousPhoto);
    }

    const response = await axios.post(url, formData, config);
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      window.location.href = `http://localhost:3000/profile`; // Refresh the page
    }, 1500);
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      setError(error.response.data.message);
    }
  }
};


  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <TopBar />
        <main className="flex-grow flex items-center justify-center bg-gray-100 mt-5 mb-5">
          <div className="flex w-full">
            {/* Profile Picture */}
            <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-green-500 to-cyan-500 mt-4 mb-4 rounded-lg">
              <div className="w-full h-full flex items-center justify-center">
                {userProfile.photo ? (
                  <img
                    src={`http://localhost:8080/api/images/${userProfile.photo}`}
                    alt="avatar"
                    className="w-72 h-72 rounded-full border border-2 border-gray-800 mb-5"
                  />
                ) : (
                  <img
                    src={avatar} // Replace with the path to your default avatar image
                    alt="default-avatar"
                    className="w-72 h-72 rounded-full mb-5"
                  />
                )}
              </div>
            </div>

            {/* Edit Profile Form */}
            <div className="flex items-center justify-center w-full h-full mt-4 mb-4">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full h-full">
                <h1 className="font-bold text-green-600 text-2xl mb-4 mt-6 text-center">
                  Edit Profile
                </h1>
                {/* Add your form code here */}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="flex gap-4">
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="Result"
                        className="font-semibold text-sm text-gray-800"
                      >
                        CGPA
                      </label>
                      <input
                        type="text"
                        name="Result"
                        onChange={handleChange}
                        value={data.Result}
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                        placeholder=""
                      />
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="Education"
                        className="font-semibold text-sm text-gray-800"
                      >
                        Education
                      </label>
                      <input
                        type="text"
                        name="Education"
                        onChange={handleChange}
                        value={data.Education}
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="Strength"
                        className="font-semibold text-sm text-gray-800"
                      >
                        Strength
                      </label>
                      <input
                        type="text"
                        name="Strength"
                        onChange={handleChange}
                        value={data.Strength}
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                        placeholder=""
                      />
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="Achievements"
                        className="font-semibold text-sm text-gray-800"
                      >
                        Achievements
                      </label>
                      <input
                        type="text"
                        name="Achievements"
                        onChange={handleChange}
                        value={data.Achievements}
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label
                      htmlFor="Experience"
                      className="font-semibold text-sm text-gray-800"
                    >
                      Experience
                    </label>
                    <input
                      type="text"
                      name="Experience"
                      onChange={handleChange}
                      value={data.Experience}
                      className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                      placeholder=""
                    />
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <label
                      htmlFor="Bio"
                      className="font-semibold text-sm text-gray-800"
                    >
                      Bio
                    </label>
                    <textarea
                      name="Bio"
                      onChange={handleChange}
                      value={data.Bio}
                      className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 resize-none"
                      rows={4}
                      placeholder=""
                    />
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <label
                      htmlFor="photo"
                      className="font-semibold text-sm text-gray-800"
                    >
                      Upload Profile Picture
                    </label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handlePhoto}
                      className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold py-2.5 px-6 w-full rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-green-600 text-xl font-bold text-center">
              Profile Updated<br/>Successfully !
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
