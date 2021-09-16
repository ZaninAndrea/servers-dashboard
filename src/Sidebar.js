import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Fab from "@mui/material/Fab"
import AddIcon from "@mui/icons-material/Add"
import Typography from "@mui/material/Typography"

export default function Sidebar({
    configs,
    selectedIdx,
    selectConfig,
    openNewConfigPage,
}) {
    return (
        <div className="sidebar">
            <Typography
                variant="h5"
                gutterBottom
                component="div"
                color="secondary.contrastText"
                className="sidebar-title"
            >
                Admin Dashboard
            </Typography>
            <List className="sidebar-height">
                {configs.map((config, idx) => (
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => selectConfig(idx)}>
                            <ListItemText
                                primary={config.App.Name}
                                primaryTypographyProps={{
                                    color:
                                        selectedIdx === idx
                                            ? "#FFCD4B"
                                            : "rgba(255,255,255,0.85)",
                                }}
                                secondary={config.Domain}
                                secondaryTypographyProps={{
                                    color:
                                        selectedIdx === idx
                                            ? "rgba(255,205,75, 0.7)"
                                            : "rgba(255,255,255,0.6)",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Fab
                color="primary"
                aria-label="add"
                className="new-server-button"
                onClick={openNewConfigPage}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}
