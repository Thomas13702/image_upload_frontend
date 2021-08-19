import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Progress from "../components/Progress";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState();
  const [text, setText] = useState();
  const [images, setImages] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !text) {
      return;
    }

    const formData = new FormData(); //backend expects data in form type
    formData.append("image", selectedImage);
    formData.append("text", text);

    const res = await axios.post(
      "http://localhost:5000/posts/image-upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      }
    );

    setTimeout(() => setUploadPercentage(0), 10000);

    if (res.statusText === "OK") {
      setImages([...images, res.data]);
    }
  };
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>
      <Progress percentage={uploadPercentage} />

      <form action="" onSubmit={handleImageUpload}>
        <input
          onChange={handleChange}
          accept=".jpg, .png, .jpeg"
          type="file"
          className="fileInput mb-2"
        ></input>
        <textarea
          type="text"
          name="text"
          id="post"
          cols="100"
          rows="5"
          autoFocus
          maxLength="240"
          placeholder="Post Text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div>
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary mb-2"
          />
        </div>
      </form>

      <div className="row text-center tex-lg-left">
        {images
          ? images.map((image) => (
              <div className="col-lg-3 col-md-4 col-6" key={image.cloudinaryId}>
                <a
                  href={image.url}
                  target="_blank"
                  className="d-block mb-4 h-100"
                >
                  <img
                    className="img-fluid img-thumbnail"
                    src={image.url}
                    alt=""
                  />
                </a>
              </div>
            ))
          : "No Images"}
      </div>
    </Container>
  );
}
