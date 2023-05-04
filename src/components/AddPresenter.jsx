import React, { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { addPresenter } from "../service/api";
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const AddPresenter = () => {
  const [presenter, setPresenter] = useState(initialValue);
  const { name, username, email, phone } = presenter;
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formValid, setFormValid] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const isNameValid = validateName();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    setFormValid(
      isNameValid && isUsernameValid && isEmailValid && isPhoneValid
    );
  }, [presenter]);
  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateUsername = () => {
    if (username.trim() === "") {
      setUsernameError("Username is required");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (phone.trim() === "") {
      setPhoneError("Phone is required");
      return false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const onValueChange = (e) => {
    setPresenter({ ...presenter, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const isNameValid = validateName();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    if (isNameValid && isUsernameValid && isEmailValid && isPhoneValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateForm();
    if (formValid) {
      await addPresenter(presenter);
      navigate("/");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add Presenter</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        {nameError && <Typography color="error">{nameError}</Typography>}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        {usernameError && (
          <Typography color="error">{usernameError}</Typography>
        )}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        {emailError && <Typography color="error">{emailError}</Typography>}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        {phoneError && <Typography color="error">{phoneError}</Typography>}
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e)}
        >
          Add
        </Button>
      </FormControl>
    </Container>
  );
};
export default AddPresenter;
