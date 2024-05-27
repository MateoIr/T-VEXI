import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CustomSnackBar = ({ error, text }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      return;
    }
  }, [error]);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};
CustomSnackBar.propTypes = {
  error: PropTypes.bool,
  text: PropTypes.string.isRequired,
};
export default CustomSnackBar;
