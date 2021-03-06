import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStores";
import { toast } from "react-toastify";
import * as CourseActions from "../actions/courseActions";

const ManageCoursePage = (props) => {
  //form state
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    authorId: null,
    category: "",
  });

  //Auto-update form inputs with a selected course
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //from the path `/courses/:slug`
    if (courses.length === 0) {
      CourseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  //handle form changes with destructuring
  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  //validate form input
  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is Required";
    if (!course.authorId) _errors.authorId = "Author ID is Required";
    if (!course.category) _errors.category = "Category is Required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  //Submit form data
  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    CourseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved.");
    });
  }
  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
