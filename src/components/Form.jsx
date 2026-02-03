import React, { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ mode, onUpdateProfiles }) => {
    // 1. Centralized State
    const [values, setValues] = useState({
        name: "",
        title: "",
        email: "",
        bio: "",
        image: null,
    });

    const [errors, setErrors] = useState({
        name: "", title: "", email:
            "", bio: "", image: "", general: ""
    });
    const [submitting, setSubmitting] = useState(false);

    // 2. Unified Validation Logic
    const validate = (name, value) => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Name is required.";
                return "";
            case "email":
                if (!value.trim()) return "Email is required.";
                if (!value.includes("@")) return "Invalid email format.";
                return "";
            case "image":
                const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
                if (value && !allowedTypes.includes(value.type)) {
                    return "Invalid file type. Only PNG, JPG, and GIF allowed.";
                }
                return "";
            case "title":
                if (!value.trim()) return "Title is required.";
                return "";
            case "bio":
                if (value.length > 200) return "Bio must be less than 200 characters long.";
                return "";
            default:
                return !value.trim() ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.` : "";
        }
    };

    // 3. Generic Change Handler for Text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        // Clear errors as user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // 4. Specific Handler for Files
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const errorMsg = validate("image", file);

        if (errorMsg) {
            setErrors((prev) => ({ ...prev, image: errorMsg }));
            e.target.value = ""; // Reset input
        } else {
            setValues((prev) => ({ ...prev, image: file }));
            setErrors((prev) => ({ ...prev, image: "" }));
        }
    };

    // 5. Validation on Blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMsg = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const isFormIncomplete = !values.name.trim() || 
                         !values.email.trim() || 
                         !values.title.trim() || 
                         !values.image;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (Object.values(errors).some(err => err)) {
                setErrors((prev) => ({ ...prev, general: "Please fix the errors above before submitting." }));
                return;
            }

            const cleanedData = {
                id: Date.now(), // Generate a unique ID so React doesn't get confused
                name: values.name,
                title: values.title,
                email: values.email,
                description: values.bio, // Rename 'bio' to 'description' to match App.jsx
                image: values.image ? URL.createObjectURL(values.image) : null
            };

            // Simulate form submission
            onUpdateProfiles(cleanedData);
            console.log("Form submitted successfully with data:", cleanedData);

            setValues({
                name: "",
                title: "",
                email: "",
                bio: "",
                image: null,
            });
            setErrors({
                name: "", title: "", email:
                    "", bio: "", image: "", general: ""
            });

        } catch (error) {
            setErrors((prev) => ({ ...prev, general: "An error occurred during submission. Please try again." }));
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <form className={`${styles.formBox} ${styles[mode]}`} onSubmit={handleSubmit}>
            {/* Name Input */}
            <label htmlFor="name">Full Name:</label>
            <input
                name="name"
                id="name"
                placeholder="Full Name"
                className={styles.nameInput}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            {/* Email Input */}
            <label htmlFor="email">Email Address:</label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className={styles.emailInput}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            {/* Title Input */}
            <label htmlFor="title">Job Title:</label>
            <input
                name="title"
                id="title"
                className={styles.titleInput}
                placeholder="Job Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}

            {/* Bio Input */}
            <label htmlFor="bio">Short Bio:</label>
            <textarea
                name="bio"
                id="bio"
                placeholder="Short Bio"
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.bio && <p className={styles.error}>{errors.bio}</p>}

            {/* File Input */}
            <div className={styles.fileInputContainer}>
                <label htmlFor="image-upload">Profile Picture:</label>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={handleFileChange}
                />
            </div>
            {/* <button type="submit" disabled={submitting} onClick={handleSubmit}>Submit</button> */}
            <button
                type="submit"
                disabled={submitting || Object.values(errors).some(err => err !== "") || isFormIncomplete}
            >
                {submitting ? "Submitting..." : "Submit"}
            </button>

            {errors.general && <p className={styles.error}>{errors.general}</p>}
        </form>
    );
};

export default Form;