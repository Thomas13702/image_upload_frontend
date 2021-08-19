import axios from "axios";
import { Container } from "react-bootstrap";
import Head from "next/head";

export default function AllPosts({ res }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="container">
        {res
          ? res.map((post) => (
              <div className="col-lg-3 col-md-4 col-6" key={post._id}>
                <a
                  href={post.url}
                  target="_blank"
                  className="d-block mb-4 h-100"
                >
                  <img
                    className="img-fluid img-thumbnail"
                    src={post.url}
                    alt=""
                  />
                  <p>{post.comment}</p>
                </a>
              </div>
            ))
          : "No posts"}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  try {
    const res = await axios.get("http://localhost:5000/posts/allPosts");

    return {
      props: {
        res: res.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
