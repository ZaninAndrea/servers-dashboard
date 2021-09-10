import React, { Component } from "react"
import "./App.css"
import LoginGate from "./LoginGate"
import Sidebar from "./Sidebar"
import MainBody from "./MainBody"
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

const BASE_DOMAIN = "http://localhost:8080"
class App extends Component {
    constructor(props) {
        super(props)
        const password = localStorage.getItem("password")

        this.state = {
            password,
            keepLoginScreen: false,
            selectedIdx: null,
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

    fetchData = async (callback = () => {}) => {
        const configs = await fetch(
            BASE_DOMAIN + "/admin/configs?password=" + this.state.password
        ).then((res) => res.json())

        this.setState({ configs, keepLoginScreen: false }, callback)
    }

    render() {
        if (!this.state.password || this.state.keepLoginScreen) {
            return (
                <ThemeProvider theme={lightTheme}>
                    <LoginGate logIn={this.logIn} />
                </ThemeProvider>
            )
        } else if (!this.state.configs) return <></>

        return (
            <ThemeProvider theme={lightTheme}>
                <div className="app">
                    <Sidebar
                        configs={this.state.configs}
                        selectedIdx={this.state.selectedIdx}
                        selectConfig={(idx) =>
                            this.setState({ selectedIdx: idx })
                        }
                    />
                    <MainBody
                        configs={this.state.configs}
                        selectedIdx={this.state.selectedIdx}
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
                                        this.fetchData(() => resolve()).catch(
                                            () => reject()
                                        )
                                    })
                                    .catch(() => reject())
                            })
                        }}
                    />
                </div>
            </ThemeProvider>
        )
    }
}

export default App
