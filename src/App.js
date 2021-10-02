import React, { Component } from "react"
import "./App.css"
import LoginGate from "./LoginGate"
import Sidebar from "./Sidebar"
import MainBody from "./MainBody"
import NewAppBody from "./NewAppBody"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#FFB500",
        },
        secondary: {
            main: "#253138",
        },
    },
})

const BASE_DOMAIN = "https://servers.baida.dev:8080"
class App extends Component {
    constructor(props) {
        super(props)
        const password = localStorage.getItem("password")

        this.state = {
            password,
            keepLoginScreen: false,
            selectedIdx: null,
            creatingNewConfig: false,
        }
    }
    componentDidMount() {
        this.fetchData()
    }

    logIn = (password) => {
        localStorage.setItem("password", password)
        this.setState({ password, keepLoginScreen: true }, () => {
            this.fetchData()
        })
    }

    fetchData = async (callback = () => {}, goToHome = false) => {
        const configs = await fetch(
            BASE_DOMAIN + "/admin/configs?password=" + this.state.password
        ).then((res) => res.json())

        this.setState(
            {
                configs,
                keepLoginScreen: false,
                ...(goToHome ? { selectedIdx: null } : {}),
            },
            callback
        )
    }

    render() {
        if (!this.state.password || this.state.keepLoginScreen) {
            return (
                <ThemeProvider theme={lightTheme}>
                    <LoginGate logIn={this.logIn} />
                </ThemeProvider>
            )
        } else if (!this.state.configs)
            return (
                <ThemeProvider theme={lightTheme}>
                    <div className="app">
                        <Sidebar
                            configs={null}
                            selectedIdx={this.state.selectedIdx}
                            selectConfig={(idx) =>
                                this.setState({
                                    selectedIdx: idx,
                                    creatingNewConfig: false,
                                })
                            }
                            openNewConfigPage={() =>
                                this.setState({ creatingNewConfig: true })
                            }
                        />
                        <MainBody
                            configs={this.state.configs}
                            selectedIdx={this.state.selectedIdx}
                        />
                    </div>
                </ThemeProvider>
            )

        return (
            <ThemeProvider theme={lightTheme}>
                <div className="app">
                    <Sidebar
                        configs={this.state.configs}
                        selectedIdx={this.state.selectedIdx}
                        selectConfig={(idx) =>
                            this.setState({
                                selectedIdx: idx,
                                creatingNewConfig: false,
                            })
                        }
                        openNewConfigPage={() =>
                            this.setState({ creatingNewConfig: true })
                        }
                    />
                    {this.state.creatingNewConfig ? (
                        <NewAppBody
                            createConfig={(newConfig) => {
                                return new Promise(async (resolve, reject) => {
                                    await fetch(
                                        BASE_DOMAIN +
                                            "/admin/configs?password=" +
                                            this.state.password,
                                        {
                                            method: "POST",
                                            body: JSON.stringify(newConfig),
                                        }
                                    )
                                        .then(() => {
                                            this.fetchData(() => {
                                                resolve()
                                                this.setState({
                                                    creatingNewConfig: false,
                                                    selectedIdx:
                                                        this.state.configs
                                                            .length - 1,
                                                })
                                            }).catch(() => reject())
                                        })
                                        .catch(() => reject())
                                })
                            }}
                        />
                    ) : (
                        <MainBody
                            configs={this.state.configs}
                            selectedIdx={this.state.selectedIdx}
                            password={this.state.password}
                            updateConfig={(updatedConfig) => {
                                return new Promise(async (resolve, reject) => {
                                    await fetch(
                                        BASE_DOMAIN +
                                            "/admin/configs?password=" +
                                            this.state.password,
                                        {
                                            method: "PUT",
                                            body: JSON.stringify(updatedConfig),
                                        }
                                    )
                                        .then(() => {
                                            this.fetchData(() =>
                                                resolve()
                                            ).catch(() => reject())
                                        })
                                        .catch(() => reject())
                                })
                            }}
                            deleteConfig={() => {
                                return new Promise(async (resolve, reject) => {
                                    await fetch(
                                        BASE_DOMAIN +
                                            "/admin/configs/" +
                                            this.state.configs[
                                                this.state.selectedIdx
                                            ].ID +
                                            "?password=" +
                                            this.state.password,
                                        {
                                            method: "DELETE",
                                        }
                                    )
                                        .then(() => {
                                            this.fetchData(
                                                () => resolve(),
                                                true
                                            ).catch(() => reject())
                                        })
                                        .catch(() => reject())
                                })
                            }}
                        />
                    )}
                </div>
            </ThemeProvider>
        )
    }
}

export default App
