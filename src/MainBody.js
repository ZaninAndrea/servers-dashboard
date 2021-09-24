import React, { Component } from "react"
import Typography from "@mui/material/Typography"
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
        mode: "users",
    }

    render() {
        if (this.props.selectedIdx === null) {
            return <div className="main"></div>
        }

        return (
            <div className="main">
                {this.state.mode === "configuration" && (
                    <ConfigurationEditor
                        selectedIdx={this.props.selectedIdx}
                        configs={this.props.configs}
                        updateConfig={this.props.updateConfig}
                        deleteConfig={this.props.deleteConfig}
                    />
                )}
                {this.state.mode === "users" && (
                    <UsersEditor
                        configId={this.props.configs[this.props.selectedIdx].ID}
                        password={this.props.password}
                    />
                )}

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
