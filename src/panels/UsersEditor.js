import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Table from "@mui/material/Table"
import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Checkbox from "@mui/material/Checkbox"

const BASE_DOMAIN = "https://servers.baida.dev:8080"

export default class UsersEditor extends Component {
    state = {
        users: null,
        selected: {},
    }

    constructor(props) {
        super(props)
        this.fetchUsers()
    }

    fetchUsers = async () => {
        const users = await fetch(
            BASE_DOMAIN +
                `/admin/configs/${this.props.configId}/users?password=${this.props.password}`
        ).then((res) => res.json())

        this.setState({ users })
    }
    render() {
        if (this.state.users === null) {
            return (
                <div className="main-content">
                    <CircularProgress size={50} className="centered-spinner" />
                </div>
            )
        }

        let checkedRowsCount = Object.values(this.state.selected).filter(
            (value) => !!value
        ).length

        return (
            <div className="main-content user-editor">
                <div className="commands">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ gridArea: "new-user" }}
                    >
                        Add User
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={checkedRowsCount === 0}
                        style={{ gridArea: "delete-user" }}
                    >
                        Delete selected
                    </Button>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={
                                        checkedRowsCount !==
                                            this.state.users.length &&
                                        checkedRowsCount != 0
                                    }
                                    checked={
                                        checkedRowsCount ===
                                        this.state.users.length
                                            ? true
                                            : false
                                    }
                                    inputProps={{
                                        "aria-label": "select everything",
                                    }}
                                    onClick={(e, allSelected) => {
                                        if (
                                            checkedRowsCount !==
                                            this.state.users.length
                                        ) {
                                            this.setState({
                                                selected:
                                                    this.state.users.reduce(
                                                        (acc, curr, i) => {
                                                            acc[i] = true
                                                            return acc
                                                        },
                                                        {}
                                                    ),
                                            })
                                        } else {
                                            this.setState({ selected: {} })
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((user, i) => (
                            <TableRow key={user.ID}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={!!this.state.selected[i]}
                                        onChange={(e, newValue) =>
                                            this.setState(({ selected }) => ({
                                                selected: {
                                                    ...selected,
                                                    [i]: newValue,
                                                },
                                            }))
                                        }
                                    />
                                </TableCell>
                                <TableCell align="left">{user.ID}</TableCell>
                                <TableCell align="left">{user.Email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
