import React, { useReducer, useRef, useLayoutEffect, useState } from "react";
import styles from "./Form.module.css";

const initialState = {
  values: { name: "", title: "", email: "", bio: "", image: null },
  errors: { name: "", title: "", email: "", bio: "", image: "", general: "" },
  submitting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.errors },
      };

    case "SUBMIT_START":
      return { ...state, submitting: true };

    case "SUBMIT_END":
      return { ...state, submitting: false };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

const validate = (name, value) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required.";
      return "";
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!value.includes("@")) return "Invalid email format.";
      return "";
    case "title":
      if (!value.trim()) return "Title is required.";
      return "";
    case "bio":
      if (value.length > 200)
        return "Bio must be less than 200 characters long.";
      return "";
    case "image":
      if (!value) return ""; // optional
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(value.type))
        return "Invalid file type. Only PNG, JPG, and GIF allowed.";
      return "";
    default:
      return !value.trim()
        ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
        : "";
  }
};

const Form = ({ mode, onUpdateProfiles }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    title: useRef(null),
    bio: useRef(null),
    image: useRef(null),
  };

  const formRef = useRef(null);
  const [isCompact, setIsCompact] = useState(false);

  useLayoutEffect(() => {
    if (formRef.current) {
      const width = formRef.current.offsetWidth;
      setIsCompact(width < 400); // compact layout if narrow
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({ type: "UPDATE_FIELD", field: name, value });

    const errorMsg = validate(name, value);
    dispatch({ type: "SET_ERROR", field: name, error: errorMsg });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const errorMsg = validate("image", file);

    if (errorMsg) {
      dispatch({ type: "SET_ERROR", field: "image", error: errorMsg });
      e.target.value = "";
    } else {
      dispatch({ type: "UPDATE_FIELD", field: "image", value: file });
      dispatch({ type: "SET_ERROR", field: "image", error: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validate(name, value);
    dispatch({ type: "SET_ERROR", field: name, error: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });

    const newErrors = {};
    Object.keys(state.values).forEach((key) => {
      newErrors[key] = validate(key, state.values[key]);
    });

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) {
      dispatch({
        type: "SET_ERRORS",
        errors: { ...newErrors, general: "Please fix the errors above." },
      });

      // Scroll to first error
      const firstErrorField = Object.keys(newErrors).find((key) => newErrors[key]);
      if (firstErrorField) {
        fieldRefs[firstErrorField].current.scrollIntoView({ behavior: "smooth" });
        fieldRefs[firstErrorField].current.focus();
      }

      dispatch({ type: "SUBMIT_END" });
      return;
    }

    const cleanedData = {
      id: Date.now(),
      name: state.values.name,
      title: state.values.title,
      email: state.values.email,
      description: state.values.bio,
      image: state.values.image ? URL.createObjectURL(state.values.image) : null,
    };

    onUpdateProfiles(cleanedData);
    dispatch({ type: "RESET_FORM" });
  };

  const isFormIncomplete =
    !state.values.name.trim() || !state.values.email.trim() || !state.values.title.trim();

  return (
    <form
      ref={formRef}
      className={`${styles.formBox} ${styles[mode]} ${isCompact ? styles.compact : ""}`}
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <label htmlFor="name">Full Name:</label>
      <input
        ref={fieldRefs.name}
        name="name"
        id="name"
        placeholder="Full Name"
        value={state.values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {state.errors.name && <p className={styles.error}>{state.errors.name}</p>}

      {/* Email */}
      <label htmlFor="email">Email Address:</label>
      <input
        ref={fieldRefs.email}
        name="email"
        id="email"
        type="email"
        placeholder="Email Address"
        value={state.values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {state.errors.email && <p className={styles.error}>{state.errors.email}</p>}

      {/* Title */}
      <label htmlFor="title">Job Title:</label>
      <input
        ref={fieldRefs.title}
        name="title"
        id="title"
        placeholder="Job Title"
        value={state.values.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {state.errors.title && <p className={styles.error}>{state.errors.title}</p>}

      {/* Bio */}
      <label htmlFor="bio">Short Bio:</label>
      <textarea
        ref={fieldRefs.bio}
        name="bio"
        id="bio"
        placeholder="Short Bio"
        value={state.values.bio}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {state.errors.bio && <p className={styles.error}>{state.errors.bio}</p>}

      {/* Image */}
      <div className={styles.fileInputContainer}>
        <label htmlFor="image-upload">Profile Picture:</label>
        <input
          ref={fieldRefs.image}
          type="file"
          id="image-upload"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={handleFileChange}
        />
      </div>
      {state.errors.image && <p className={styles.error}>{state.errors.image}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          state.submitting ||
          Object.values(state.errors).some((err) => err !== "") ||
          isFormIncomplete
        }
      >
        {state.submitting ? "Submitting..." : "Submit"}
      </button>

      {state.errors.general && <p className={styles.error}>{state.errors.general}</p>}
    </form>
  );
};

export default Form;
