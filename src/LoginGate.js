import React, { Component } from "react"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"

const BASE_DOMAIN = "https://servers.baida.dev:8080"
export default class LoginGate extends Component {
    state = { password: "", error: "", loading: false }

    setPassword = async () => {
        this.setState({ loading: true })
        const res = await fetch(
            BASE_DOMAIN + "/admin/checkPassword?password=" + this.state.password
        ).then((res) => res.json())

        if (res.error) {
            this.setState({ error: res.error, loading: false })
        } else {
            this.props.logIn(this.state.password)
            this.setState({ loading: true })
        }
    }

    render() {
        return (
            <div className="loginGate">
                <Paper
                    elevation={5}
                    className="login-form"
                    sx={{ bgcolor: "secondary.main" }}
                >
                    <Box component="form" noValidate autoComplete="off">
                        <Typography
                            variant="h3"
                            gutterBottom
                            component="div"
                            style={{ textAlign: "center" }}
                            color="primary"
                        >
                            Admin Login
                        </Typography>
                        <TextField
                            id="password-field"
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            color="primary"
                            focused
                            inputProps={{ style: { color: "white" } }}
                            value={this.state.password}
                            onChange={(e) =>
                                this.setState({ password: e.target.value })
                            }
                            error={this.state.error}
                            helperText={
                                this.state.error ? "Incorrect password" : ""
                            }
                        />
                        <br />
                        <br />
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.setPassword}
                            disabled={!this.state.password}
                            loading={this.state.loading}
                        >
                            Sign In
                        </LoadingButton>
                    </Box>
                </Paper>
            </div>
        )
    }
}
