import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import "./form.css";
import Bookslist from "./Bookslist";

export default function FormikForm() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    publication: "",
    description: "",
    price: "",
    user: [],
    id: "",
  });

  const validate = (values) => {
    let errors = {};
    if (!values.title) errors.title = "Title name is required";
    if (!values.author) errors.author = "Author name is required";
    if (!values.publication)
      errors.publication = "Publication name is required";
    if (!values.description)
      errors.description = "please enter some description";
    return errors;
  };

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://62cf0d49826a88972d08517c.mockapi.io/Books"
      );
      // console.log(response.data);
      setInitialValues({ user: response.data });
    }
    getData();
  }, []);
  const postData = async (values) => {
    const response = await axios.post(
      "https://62cf0d49826a88972d08517c.mockapi.io/Books",
      {
        title: values.title,
        author: values.author,
        publication: values.publication,
        description: values.description,
        price: values.price,
      }
    );

    const user = initialValues.user;
    user.push(response.data);
    setInitialValues({ user });
    // console.log(response.data);
  };

  const onSubmit = (values, { resetForm }) => {
    // console.log(values);
    postData(values);
    resetForm();
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://62cf0d49826a88972d08517c.mockapi.io/Books/${id}`
    );
    const user = initialValues.user.filter(
      (row) => row.id !== response.data.id
    );
    setInitialValues({ user });
  };

  const onPopulatedData = (id) => {
    const selectedData = initialValues.user.filter((row) => row.id === id)[0];
    // console.log(selectedData);
    setInitialValues({
      ...initialValues,
      id: selectedData.id,
      title: selectedData.title,
      author: selectedData.author,
      publication: selectedData.publication,
      description: selectedData.description,
      price: selectedData.price,
    });
  };

  return (
    <div className="mainbox">
      <div className="box1">
        <h3>Book Details</h3>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
          >
            {(formik) => {
              // console.log(formik);
              return (
                <form onSubmit={formik.handleSubmit}>
                  <div className="form_control">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.title && formik.errors.title ? (
                      <div className="error"> {formik.errors.title}</div>
                    ) : null}
                  </div>
                  <div className="form_control">
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formik.values.author}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.author && formik.errors.author ? (
                      <div className="error"> {formik.errors.author}</div>
                    ) : null}
                  </div>
                  <div className="form_control">
                    <label htmlFor="publication">Publication</label>
                    <input
                      type="text"
                      name="publication"
                      value={formik.values.publication}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.publication && formik.errors.publication ? (
                      <div className="error"> {formik.errors.publication}</div>
                    ) : null}
                  </div>
                  <div className="form_control">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="textarea"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="error"> {formik.errors.description}</div>
                    ) : null}
                  </div>
                  <div className="form_control">
                    <label htmlFor="price">Price Rs.</label>
                    <input
                      type="text"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className="error"> {formik.errors.price}</div>
                    ) : null}
                  </div>
                  <button type="Submit">Add</button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      {/* <div className="box2">
        <table cellPadding="8" border="2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {initialValues.user.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.author}</td>
                  <td>{row.publication}</td>
                  <td>{row.description}</td>
                  <td>{row.price}</td>
                  <td>
                    <button
                      type="Submit"
                      onClick={() => {
                        handleDelete(row.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
      <div className="box2">
        <Bookslist
          user={initialValues.user}
          handleDelete={(id) => {
            handleDelete(id);
          }}
          onPopulatedData={(id) => {
            onPopulatedData(id);
          }}
        />
      </div>
    </div>
  );
}
