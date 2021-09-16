import React, { Component } from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import cloneDeep from "lodash.clonedeep"
import deepEqual from "lodash.isequal"
import Fab from "@mui/material/Fab"
import IconButton from "@mui/material/IconButton"
import SaveIcon from "@mui/icons-material/Save"
import DeleteIcon from "@mui/icons-material/Delete"
import CircularProgress from "@material-ui/core/CircularProgress"

export default class MainBody extends Component {
    state = {
        saving: false,
        deleting: false,
    }

    static getDerivedStateFromProps(props, state) {
        if (
            props.selectedIdx !== null &&
            (state === null || props.configs[props.selectedIdx] != state.config)
        ) {
            return {
                config: props.configs[props.selectedIdx],
                editedConfig: cloneDeep(props.configs[props.selectedIdx]),
                saving: false,
                deleting: false,
            }
        }

        return null
    }

    render() {
        if (this.props.selectedIdx === null) {
            return <div className="main"></div>
        }

        const edited = !deepEqual(this.state.config, this.state.editedConfig)

        return (
            <div className="main">
                <div className="main-header">
                    <Typography variant="h4" component="div" className="title">
                        {this.props.configs[this.props.selectedIdx].App.Name}
                    </Typography>
                    <div className="buttons">
                        <IconButton
                            disabled={
                                !edited ||
                                this.state.saving ||
                                this.state.deleting
                            }
                            key="save-edits-button"
                            className="button"
                            onClick={() => {
                                if (!this.state.saving) {
                                    this.setState({ saving: true })

                                    this.props
                                        .updateConfig(this.state.editedConfig)
                                        .then(() => {
                                            this.setState({ saving: false })
                                        })
                                }
                            }}
                        >
                            {!this.state.saving ? (
                                <SaveIcon />
                            ) : (
                                <CircularProgress color="#FFB500" size={24} />
                            )}
                        </IconButton>
                        <IconButton
                            key="delete-button"
                            className="button"
                            onClick={() => {
                                if (!this.state.deleting) {
                                    this.setState({ deleting: true })
                                    this.props.deleteConfig().then(() => {
                                        this.setState({ deleting: false })
                                    })
                                }
                            }}
                            disabled={this.state.saving || this.state.deleting}
                        >
                            {!this.state.deleting ? (
                                <DeleteIcon />
                            ) : (
                                <CircularProgress color="#FFB500" size={24} />
                            )}
                        </IconButton>
                    </div>
                </div>
                <div className="main-configuration">
                    <Typography variant="h4" gutterBottom component="div">
                        Server
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        color="primary"
                        label="ID"
                        value={this.state.editedConfig.ID}
                        disabled
                    />
                    <br />
                    <br />

                    <TextField
                        variant="outlined"
                        fullWidth
                        color="primary"
                        label="Domain"
                        value={this.state.editedConfig.Domain}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
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
                        value={this.state.editedConfig.App.Name}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    App: {
                                        ...editedConfig.App,
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
                        value={this.state.editedConfig.App.Link}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    App: {
                                        ...editedConfig.App,
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
                        value={this.state.editedConfig.App.LogoLink}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    App: {
                                        ...editedConfig.App,
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
                        value={this.state.editedConfig.App.HeaderColor}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    App: {
                                        ...editedConfig.App,
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
                        value={this.state.editedConfig.Company.Name}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    Company: {
                                        ...editedConfig.Company,
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
                        value={this.state.editedConfig.Company.Address}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    Company: {
                                        ...editedConfig.Company,
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
                        value={this.state.editedConfig.Smtp.Server}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    Smtp: {
                                        ...editedConfig.Smtp,
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
                        value={this.state.editedConfig.Smtp.Port}
                        type="number"
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    Smtp: {
                                        ...editedConfig.Smtp,
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
                        value={this.state.editedConfig.Smtp.Username}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    Smtp: {
                                        ...editedConfig.Smtp,
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
                        value={this.state.editedConfig.Smtp.Password}
                        onChange={(e) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    Smtp: {
                                        ...editedConfig.Smtp,
                                        Password: e.target.value,
                                    },
                                },
                            }))
                        }
                    />
                </div>
            </div>
        )
    }
}
