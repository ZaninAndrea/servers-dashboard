import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Table from "@mui/material/Table"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Checkbox from "@mui/material/Checkbox"
import CloseIcon from "@mui/icons-material/Close"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"

const BASE_DOMAIN = "https://servers.baida.dev:8080"

export default class UsersEditor extends Component {
    state = {
        users: null,
        selected: {},
        openedUserIndex: null,
        userData: null,
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

    selectUser = async (index) => {
        this.setState({
            openedUserIndex: index,
        })

        const res = await fetch(
            BASE_DOMAIN +
                `/admin/configs/${this.props.configId}/users/${this.state.users[index].ID}?password=${this.props.password}`
        ).then((res) => res.json())

        this.setState({
            userData: res.Data,
        })
    }

    render() {
        if (this.state.users === null) {
            return (
                <div className="main-content user-editor">
                    <div className="commands">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ gridArea: "new-user" }}
                            disabled
                        >
                            Add User
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled
                            style={{ gridArea: "delete-user" }}
                        >
                            Delete selected
                        </Button>
                    </div>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox color="primary" disabled />
                                </TableCell>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {new Array(15).fill(0).map(() => (
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox color="primary" disabled />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )
        }

        let checkedRowsCount = Object.values(this.state.selected).filter(
            (value) => !!value
        ).length

        if (this.state.openedUserIndex === null)
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
                                <TableRow
                                    key={user.ID}
                                    onClick={() => this.selectUser(i)}
                                    className="userRow"
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={!!this.state.selected[i]}
                                            onChange={(e, newValue) => {
                                                this.setState(
                                                    ({ selected }) => ({
                                                        selected: {
                                                            ...selected,
                                                            [i]: newValue,
                                                        },
                                                    })
                                                )
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.ID}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.Email}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )
        else
            return (
                <div className="main-content user-content">
                    <Paper className="user-edit-header">
                        <Typography
                            variant="h5"
                            className="user-edit-title"
                            style={{ gridArea: "title" }}
                        >
                            {this.state.users[this.state.openedUserIndex].Email}
                        </Typography>
                        <IconButton
                            style={{ gridArea: "close" }}
                            onClick={() =>
                                this.setState({
                                    openedUserIndex: null,
                                    userData: null,
                                })
                            }
                        >
                            <CloseIcon sx={{ fontSize: 28 }}></CloseIcon>
                        </IconButton>
                    </Paper>
                    <div>
                        {!this.state.userData && (
                            <CircularProgress
                                size={50}
                                className="centered-spinner"
                            />
                        )}
                        {this.state.userData && (
                            <div className="user-data-body">
                                <TextField
                                    label="User data"
                                    placeholder="User data"
                                    multiline
                                    value={JSON.stringify(
                                        this.state.userData,
                                        null,
                                        2
                                    )}
                                    maxRows={32}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                <pre></pre>
                            </div>
                        )}
                    </div>
                </div>
            )
    }
}
