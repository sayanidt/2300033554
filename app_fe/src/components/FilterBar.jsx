import { Box, Button, MenuItem, TextField } from "@mui/material";

function FilterBar({ type, setType, view, setView, limit, setLimit }) {
    return (
        <Box className="filter-bar">
            <TextField
                select
                label="Notification Type"
                value={type}        
                onChange={(e) => setType(e.target.value)}
                size="small"
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Placement">Placement</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
                <MenuItem value="Result">Result</MenuItem>
            </TextField>
            <TextField
                select
                label="Limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                size="small"
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
            </TextField>
            <Button
                variant={view === "priority" ? "contained" : "outlined"}
                onClick={() => setView("priority")}
            >
                Priority
            </Button>   

        </Box>
    );}

export default FilterBar;