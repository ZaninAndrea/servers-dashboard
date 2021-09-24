import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Fab from "@mui/material/Fab"
import SaveIcon from "@mui/icons-material/Save"
import CircularProgress from "@material-ui/core/CircularProgress"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"
import cloneDeep from "lodash.clonedeep"
import deepEqual from "lodash.isequal"

export default class ConfigurationEditor extends React.Component {
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
        let updateConfiguration = (update) =>
            this.setState(({ editedConfig }) => ({
                editedConfig: {
                    ...editedConfig,
                    ...update,
                },
            }))
        let configuration = this.state.editedConfig
        const edited = !deepEqual(this.state.config, this.state.editedConfig)

        return (
            <div className="main-content">
                <Fab
                    disabled={
                        !edited || this.state.saving || this.state.deleting
                    }
                    key="save-edits-button"
                    className="config-save-edits-button"
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
                    color="primary"
                >
                    {!this.state.saving ? (
                        <SaveIcon />
                    ) : (
                        <CircularProgress color="#FFB500" size={24} />
                    )}
                </Fab>
                <Fab
                    key="delete-button"
                    className="config-delete-button"
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
                </Fab>

                <Typography variant="h4" gutterBottom component="div">
                    Server
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="ID"
                    value={configuration.ID}
                    disabled
                />
                <br />
                <br />

                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Domain"
                    value={configuration.Domain}
                    onChange={(e) =>
                        updateConfiguration({ Domain: e.target.value })
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
                    value={configuration.App.Name}
                    onChange={(e) =>
                        updateConfiguration({
                            App: {
                                ...configuration.App,
                                Name: e.target.value,
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Homepage link"
                    value={configuration.App.Link}
                    onChange={(e) =>
                        updateConfiguration({
                            App: {
                                ...configuration.App,
                                Link: e.target.value,
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Logo link"
                    value={configuration.App.LogoLink}
                    onChange={(e) =>
                        updateConfiguration({
                            App: {
                                ...configuration.App,
                                LogoLink: e.target.value,
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Header Color"
                    value={configuration.App.HeaderColor}
                    onChange={(e) =>
                        updateConfiguration({
                            App: {
                                ...configuration.App,
                                HeaderColor: e.target.value,
                            },
                        })
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
                    value={configuration.Company.Name}
                    onChange={(e) =>
                        updateConfiguration({
                            Company: {
                                ...configuration.Company,
                                Name: e.target.value,
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Address"
                    value={configuration.Company.Address}
                    onChange={(e) =>
                        updateConfiguration({
                            Company: {
                                ...configuration.Company,
                                Address: e.target.value,
                            },
                        })
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
                    value={configuration.Smtp.Server}
                    onChange={(e) =>
                        updateConfiguration({
                            Smtp: {
                                ...configuration.Smtp,
                                Server: e.target.value,
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Port"
                    value={configuration.Smtp.Port}
                    type="number"
                    onChange={(e) =>
                        updateConfiguration({
                            Smtp: {
                                ...configuration.Smtp,
                                Port: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Username"
                    value={configuration.Smtp.Username}
                    onChange={(e) =>
                        updateConfiguration({
                            Smtp: {
                                ...configuration.Smtp,
                                Username: e.target.value,
                            },
                        })
                    }
                />
                <br />
                <br />
                <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Password"
                    value={configuration.Smtp.Password}
                    onChange={(e) =>
                        updateConfiguration({
                            Smtp: {
                                ...configuration.Smtp,
                                Password: e.target.value,
                            },
                        })
                    }
                />
            </div>
        )
    }
}
