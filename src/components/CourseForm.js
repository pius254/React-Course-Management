import React from "react";
import TextInput from "./common/TextInput";
import SelectControl from "./common/SelectControl";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        onChange={props.onChange}
        name="title"
        value={props.course.title}
        error={props.errors.title}
      />

      <SelectControl
        id="author"
        name="authorId"
        label="Author"
        onChange={props.onChange}
        value={props.course.authorId || ""}
        error={props.errors.authorId}
      >
        <option value="" />
        <option value="1">Cory House</option>
        <option value="2">Scott Allen</option>
      </SelectControl>

      <TextInput
        id="category"
        label="Category"
        name="category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />
      <br />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

export default CourseForm;
