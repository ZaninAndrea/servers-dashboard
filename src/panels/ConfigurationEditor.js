import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

export default function ({ configuration, updateConfiguration }) {
    return (
        <div className="main-content">
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
