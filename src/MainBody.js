import React, { Component } from "react"
import Typography from "@mui/material/Typography"
import cloneDeep from "lodash.clonedeep"
import deepEqual from "lodash.isequal"
import Fab from "@mui/material/Fab"
import IconButton from "@mui/material/IconButton"
import SaveIcon from "@mui/icons-material/Save"
import DeleteIcon from "@mui/icons-material/Delete"
import SettingsIcon from "@mui/icons-material/Settings"
import PeopleIcon from "@mui/icons-material/People"
import CircularProgress from "@material-ui/core/CircularProgress"
import ConfigurationEditor from "./panels/ConfigurationEditor"
import UsersEditor from "./panels/UsersEditor"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Box from "@mui/material/Box"

export default class MainBody extends Component {
    state = {
        saving: false,
        deleting: false,
        mode: "users",
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
                {this.state.mode === "configuration" && (
                    <ConfigurationEditor
                        configuration={this.state.editedConfig}
                        updateConfiguration={(update) =>
                            this.setState(({ editedConfig }) => ({
                                editedConfig: {
                                    ...editedConfig,
                                    ...update,
                                },
                            }))
                        }
                    />
                )}
                {this.state.mode === "users" && <UsersEditor />}

                <Box sx={{ width: "100%" }}>
                    <BottomNavigation
                        showLabels
                        value={this.state.mode}
                        onChange={(event, newValue) => {
                            this.setState({ mode: newValue })
                        }}
                    >
                        <BottomNavigationAction
                            label="Users"
                            icon={<PeopleIcon />}
                            value="users"
                        />
                        <BottomNavigationAction
                            label="Configuration"
                            icon={<SettingsIcon />}
                            value="configuration"
                        />
                    </BottomNavigation>
                </Box>
            </div>
        )
    }
}
