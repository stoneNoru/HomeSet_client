import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginPost } from "../services/api";
import { isAuthenticated } from "../utils/checkToken";

const Container = styled.div`
  padding: 20px 20px;
  border-radius: 15px;
  background-color: white;
  min-height: 620px;
  width: 440px;
`;

const Header = styled.header`
  margin: 90px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: black;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    color: black;
    width: 60%;
    opacity: 0.5;
  }
`;

const BlackBg = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
  a {
    font-size: 18px;
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 10px 0px;
    background-color: #ff3838;
    color: white;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 15px 0px;
  font-size: 18px;
  margin-bottom: 25px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.6);
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: #d62f2f;
  }

  &[type="submit"] {
    background-color: #f56157;
    cursor: pointer;
    padding: 20px 0px;
    border-radius: 5px;
    color: white;
  }
`;

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await LoginPost(id, password);
      if (response.data.result) {
        console.log("Login successful");
        // Set token or session if needed
        navigate(from, { replace: true });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <BlackBg>
      <Container>
        <Header>
          <h1>Welcome</h1>
          <p>Log in or create Account</p>
        </Header>
        <LoginForm onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input type="submit" value="Log In" />
          <Link to="/signup">Create Account</Link>
          {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}
          <h1
            style={{ color: "black", cursor: "pointer" }}
            onClick={() => navigate("/findpw")}
          >
            비밀번호 찾기
          </h1>
        </LoginForm>
      </Container>
    </BlackBg>
  );
};

export default Login;

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { LoginPost } from "../services/api";
// import { isAuthenticated } from "../utils/checkToken";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   padding-left: 2em;
//   padding-right: 2em;
//   padding-bottom: 0.4em;
//   background-color: #171717;
//   border-radius: 25px;
//   transition: 0.4s ease-in-out;
//   &:hover {
//     /* transform: scale(1.05); */
//     border: 1px solid black;
//   }
// `;

// const Header = styled.header`
//   text-align: center;
//   margin: 2em;
//   color: rgb(255, 255, 255);
//   font-size: 1.2em;
// `;

// const BlackBg = styled.div`
//   z-index: 2;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const LoginForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5em;
//   .field {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5em;
//     border-radius: 25px;
//     padding: 0.6em;
//     background-color: #171717;
//     box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
//   }
//   .input-icon {
//     height: 1.3em;
//     width: 1.3em;
//     fill: white;
//   }
//   input {
//     background: none;
//     border: none;
//     outline: none;
//     width: 100%;
//     color: #d3d3d3;
//     padding: 15px 0px;
//     font-size: 18px;
//     transition: border-color 0.3s ease-in-out;

//     &[type="text"],
//     &[type="password"] {
//       border-bottom: 2px solid rgba(255, 255, 255, 0.2);
//       color: #d3d3d3;
//       &:hover {
//         border-color: #d62f2f;
//       }
//     }
//     &[type="submit"] {
//       background-color: #252525;
//       cursor: pointer;
//       padding: 20px 0px;
//       border-radius: 5px;
//       color: white;
//       transition: background-color 0.4s ease-in-out;
//       &:hover {
//         background-color: black;
//       }
//     }
//   }
//   .btn {
//     display: flex;
//     justify-content: center;
//     flex-direction: row;
//     margin-top: 2.5em;
//     button {
//       padding: 0.5em;
//       border-radius: 5px;
//       border: none;
//       outline: none;
//       transition: 0.4s ease-in-out;
//       background-color: #252525;
//       color: white;
//       &:hover {
//         background-color: black;
//       }
//       &.button1 {
//         padding-left: 1.1em;
//         padding-right: 1.1em;
//         margin-right: 0.5em;
//       }
//       &.button2 {
//         padding-left: 2.3em;
//         padding-right: 2.3em;
//       }
//     }
//   }
//   .button3 {
//     margin-bottom: 3em;
//     padding: 0.5em;
//     border-radius: 5px;
//     border: none;
//     outline: none;
//     transition: 0.4s ease-in-out;
//     background-color: #252525;
//     color: white;
//     &:hover {
//       background-color: red;
//     }
//   }
// `;

// const Login = () => {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/home";

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate(from, { replace: true });
//     }
//   }, [navigate, from]);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const response = await LoginPost(id, password);
//       if (response.data.result) {
//         console.log("Login successful");
//         // Set token or session if needed
//         navigate(from, { replace: true });
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError("Login failed. Please try again.");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <BlackBg>
//       <Container>
//         <Header>
//           <h1>Welcome</h1>
//           <p>Log in or create Account</p>
//         </Header>
//         <LoginForm onSubmit={handleLogin}>
//           <div className="field">
//             <svg
//               className="input-icon"
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               viewBox="0 0 16 16"
//             >
//               <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
//             </svg>
//             <input
//               type="text"
//               placeholder="Username"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//             />
//           </div>
//           <div className="field">
//             <svg
//               className="input-icon"
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               viewBox="0 0 16 16"
//             >
//               <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
//             </svg>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="btn">
//             <button className="button1" type="submit">
//               Login
//             </button>
//             <button
//               className="button2"
//               type="button"
//               onClick={() => navigate("/signup")}
//             >
//               Sign Up
//             </button>
//           </div>
//           <button
//             className="button3"
//             type="button"
//             onClick={() => navigate("/findpw")}
//           >
//             Forgot Password
//           </button>
//           {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}
//         </LoginForm>
//       </Container>
//     </BlackBg>
//   );
// };

// export default Login;
