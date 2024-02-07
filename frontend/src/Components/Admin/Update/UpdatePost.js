import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAdminDetails, updatePost } from '../../../Services/Adminapi';
import { useParams } from 'react-router-dom';




const UpdatePost = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPostDetails = async () => {
      try {
        const response = await getAdminDetails(id);
        console.log('Response from getAdminDetails:', response);
        setPostDetails(response.details || {});
      } catch (error) {
        console.error('Error fetching post details:', error.message);
        toast.error('Error fetching post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (name, files) => {
    if (files && files.length > 0) {
      setPostDetails((prevDetails) => ({ ...prevDetails, [name]: files[0] }));
    } else {
      const { [name]: removedField, ...restDetails } = postDetails;
      setPostDetails(restDetails);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('postDetails:', postDetails);
      const formData = new FormData();
      Object.entries(postDetails).forEach(([key, value]) => {
        if (key === 'file' || key === 'file2') {
          formData.append(key, value);
        } else {
          formData.append(key, value || '');
        }
      });
      console.log('FormData:', formData);
      await updatePost(id, formData);
      console.log('post updated successfully');
      toast.success('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error.message);
      toast.error('Error updating post');
    }
  };


  return (
    <div>

      <div className='pf-card'>
        {Object.keys(postDetails).length > 0 ? (
          <form onSubmit={handleSubmit}>
            <h1>Update Post</h1>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={postDetails.title || ''}
                  onChange={handleInputChange}
                />
                <br />
              </div>

              <div class="col">
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={postDetails.location || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <br />
              </div>
            </div><br />

            <div class="row">
              <div class="col">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={postDetails.price || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <br />
              </div>

              <div class="col">
                <input
                  type="text"
                  placeholder="Duration"
                  name="duration"
                  value={postDetails.duration || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <br />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <input
                  type="text"
                  placeholder="Latitude"
                  name="latitude"
                  value={postDetails.latitude || ''}
                  onChange={handleInputChange}
                  className="form-control"

                />

                <br />
              </div>

              <div class="col">
                <input
                  type="text"
                  placeholder="Longitude"
                  name="longitude"
                  value={postDetails.longitude || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <br />
              </div>
            </div>

            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              value={postDetails.description || ''}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <textarea
              name="highlights"
              id="highlights"
              cols="30"
              rows="5"
              value={postDetails.highlights || ''}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <textarea
              name="inclusions"
              id="inclusions"
              cols="30"
              rows="5"
              value={postDetails.inclusions || ''}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <textarea
              name="exclusion"
              id="exclusion"
              cols="30"
              rows="5"
              value={postDetails.exclusion || ''}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <textarea
              name="information"
              id="information"
              cols="30"
              rows="5"
              value={postDetails.information || ''}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <input
              type="file"
              name="file"
              id="file"
              className="form-control"
              accept="image/jpeg, image/png, image/gif"
              onChange={(e) => handleFileChange('file', e.target.files)}
            />
            <br />

            <input
              type="file"
              name="file2"
              id="file2"
              className="form-control"
              accept="image/jpeg, image/png, image/gif"
              onChange={(e) => handleFileChange('file2', e.target.files)}
            />

            <div>
              <button className='sedit' type="submit">
                Update
              </button>
            </div>
          </form>
        ) : (
          <p>no data</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatePost;









