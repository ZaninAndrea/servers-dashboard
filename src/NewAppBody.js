import React, { Component } from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import cloneDeep from "lodash.clonedeep"
import deepEqual from "lodash.isequal"
import Fab from "@mui/material/Fab"
import SaveIcon from "@mui/icons-material/Save"
import CircularProgress from "@material-ui/core/CircularProgress"

export default class MainBody extends Component {
    state = {
        saving: false,
        config: { App: {}, Company: {}, Smtp: {} },
    }
    render() {
        const canSave = this.state.config.Domain && this.state.config.App.Name

        return (
            <div className="new-app-main">
                <Typography variant="h4" gutterBottom component="div">
                    Server
                </Typography>

                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Domain"
                    value={this.state.config.Domain}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Domain: e.target.value,
                            },
                        }))
                    }
                />

                <br />
                <br />
                <br />
                <Typography variant="h4" gutterBottom component="div">
                    App
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Name"
                    value={this.state.config.App.Name}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                App: {
                                    ...config.App,
                                    Name: e.target.value,
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Homepage link"
                    value={this.state.config.App.Link}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                App: {
                                    ...config.App,
                                    Link: e.target.value,
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Logo link"
                    value={this.state.config.App.LogoLink}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                App: {
                                    ...config.App,
                                    LogoLink: e.target.value,
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Header Color"
                    value={this.state.config.App.HeaderColor}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                App: {
                                    ...config.App,
                                    HeaderColor: e.target.value,
                                },
                            },
                        }))
                    }
                />

                <br />
                <br />
                <br />
                <Typography variant="h4" gutterBottom component="div">
                    Company
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Name"
                    value={this.state.config.Company.Name}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Company: {
                                    ...config.Company,
                                    Name: e.target.value,
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Address"
                    value={this.state.config.Company.Address}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Company: {
                                    ...config.Company,
                                    Address: e.target.value,
                                },
                            },
                        }))
                    }
                />

                <br />
                <br />
                <br />
                <Typography variant="h4" gutterBottom component="div">
                    SMTP
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Server"
                    value={this.state.config.Smtp.Server}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Smtp: {
                                    ...config.Smtp,
                                    Server: e.target.value,
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Port"
                    value={this.state.config.Smtp.Port}
                    type="number"
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Smtp: {
                                    ...config.Smtp,
                                    Port: parseInt(e.target.value),
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Username"
                    value={this.state.config.Smtp.Username}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Smtp: {
                                    ...config.Smtp,
                                    Username: e.target.value,
                                },
                            },
                        }))
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Password"
                    value={this.state.config.Smtp.Password}
                    onChange={(e) =>
                        this.setState(({ config }) => ({
                            config: {
                                ...config,
                                Smtp: {
                                    ...config.Smtp,
                                    Password: e.target.value,
                                },
                            },
                        }))
                    }
                />

                <Fab
                    color="primary"
                    aria-label="save"
                    className="save-edits-button"
                    variant={this.state.saving ? undefined : "extended"}
                    disabled={!canSave}
                    key="save-edits-button"
                    onClick={() => {
                        if (!this.state.saving) {
                            this.setState({ saving: true })

                            this.props
                                .createConfig(this.state.config)
                                .then(() => {
                                    this.setState({ saving: false })
                                })
                        }
                    }}
                >
                    {!this.state.saving ? (
                        <>
                            <SaveIcon />
                            &nbsp; Save
                        </>
                    ) : (
                        <CircularProgress color="#FFB500" size={35} />
                    )}
                </Fab>
            </div>
        )
    }
}
