// Enhanced Delivery Order App with Modern Theme, Animated Download Button, and Success Toast
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Divider,
  Autocomplete,
  Snackbar,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import html2pdf from "html2pdf.js";
import logoBase64 from "./Demo";
import "./style.css";
import { ChevronRight } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", 
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
  },
});

export default function App() {
  const [form, setForm] = useState({
    doDate: "",
    blNo: "",
    blDate: "",
    masterBlNo: "",
    containerNo: "",
    containerType: "",
    consignee: "",
    cargoDesc: "",
    delivery: "FULL",
    packages: "",
    packageType: "",
    measurement: "",
    grossWt: "",
    vessel: "",
    rotationIgm: "",
    localIgm: "",
    smtpNo: "",
    subLineNo: "",
    destuffing: "",
    validTill: "",
    address:
      "INLAND CONTAINER DEPOT (ICD)\nWHITE FIELD BANGALORE",
  });

  const [openToast, setOpenToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return (
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear()
    );
  };

  const generatePDF = () => {
    const requiredFields = [
      "doDate",
      "blNo",
      "masterBlNo",
      "containerNo",
      "consignee",
      "cargoDesc",
      "delivery",
      "packages",
      "grossWt",
      "measurement",
    ];

    const missingFields = requiredFields.filter((field) => !form[field]);

    if (missingFields.length > 0) {
      alert("Please fill all required fields before downloading the PDF.");
      return;
    }

    setIsDownloading(true);
    const element = previewRef.current;
    const opt = {
      margin: 0.3,
      filename: "SES_Delivery_Order.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsDownloading(false);
        setOpenToast(true);
      });
  };

  const addressOptions = [
    "INLAND CONTAINER DEPOT (ICD)\nWHITE FIELD BANGALORE",
    "PEARL CONTAINER TERMINALS,\nNO.53, SIPCOT INDUSTRIAL COMPLEX,\nPHASE-I, HOSUR – 635126",
  ];

  const containerTypes = ["20", "40", "20HC", "40HC", "45", "LCL"];
  const packageTypes = ["BDL", "CAS","SHT","CHT","CLS","COL","CON","CRT","CSK","CTN","CYL","DRM","ENV","FLK","FUT","HBK","JBL","JTA","KEG","LFT","LOG","NGT","PAL","PKG","PLT","QDS","REL","RLS","SKD","SLB","TBL","TIN","TRK","UNT","PCS"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Container sx={{ mt: 4, mb: 4 }}>
          {/* ...Form and Preview Components... */}
          <Typography variant="h5" align="center" color="primary" gutterBottom>
        SREE EXIM SOLUTIONS <br />
        DELIVERY ORDER
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ minWidth: 250, fontSize:"24" }}>WELCOME <span className="arrow-icon"><ChevronRight /></span></Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              sx={{ maxWidth: 250, fontSize: "10" }}
              select
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              
            >
              {addressOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.split("\n")[0]}
                </MenuItem>
              ))}
            </TextField >
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Date" type="date" name="doDate" value={form.doDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="BL No" name="blNo" value={form.blNo} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="BL Date" type="date" name="blDate" value={form.blDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Master BL No" name="masterBlNo" value={form.masterBlNo} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Container No(s)" name="containerNo" value={form.containerNo} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              options={containerTypes}
              value={form.containerType}
              onInputChange={(e, newValue) => setForm({ ...form, containerType: newValue })}
              renderInput={(params) => (
                <TextField sx={{ minWidth: 250 }} {...params} label="Container Type" fullWidth required />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Consignee" name="consignee" value={form.consignee} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Cargo Description" name="cargoDesc" value={form.cargoDesc} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="No. of Packages" name="packages" value={form.packages} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              options={packageTypes}
              value={form.packageType}
              onInputChange={(e, newValue) => setForm({ ...form, packageType: newValue })}
              renderInput={(params) => (
                <TextField sx={{ minWidth: 250 }}{...params} label="Package Type" fullWidth required />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField sx={{ minWidth: 250 }}label="Delivery" name="delivery" value={form.delivery} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }}label="Measurement" name="measurement" value={form.measurement} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }}label="Gross Weight" name="grossWt" value={form.grossWt} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Vessel / Voyage" name="vessel" value={form.vessel} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Rotation IGM No" name="rotationIgm" value={form.rotationIgm} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Local IGM No" name="localIgm" value={form.localIgm} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="SMTP No" name="smtpNo" value={form.smtpNo} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="Sub-Line No" name="subLineNo" value={form.subLineNo} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ minWidth: 250 }} label="De-stuffing Station" name="destuffing" value={form.destuffing} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField sx={{ minWidth: 250 }} label="Valid Till" type="date" name="validTill" value={form.validTill} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 4 }} ref={previewRef}>
        <Box display="flex" mb={2}>
          <img
            src={logoBase64}
            alt="Logo"
            style={{ width: "100px", marginRight: "10px" }}
            crossOrigin="anonymous"
          />
          <Box>
            <Typography variant="h4"><strong>SREE EXIM SOLUTIONS</strong></Typography>
            <Typography variant="body2">
              ADD: UNIT NO. T-2310 | BLOCK B 3RD FLOOR | ARDENTE OFFICE ONE HOODI MAIN RD | BENGALURU 560048.
              <br />
              Phone: 080-4111 4344 | Email: sesblr@sreegroup.net | Website: https://www.sreegroup.net
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ "&::before, &::after": { borderColor: "black" }, my: 2 }} />

        <Typography variant="h6" align="center">
          <strong>DELIVERY ORDER</strong>
        </Typography>

        <Box mb={1}>
          <Typography style={{ whiteSpace: "pre-line", textTransform: "uppercase" }}>
            To,
            <br />
            THE MANAGER
            <br />
            {form.address}
          </Typography>
          <Typography textAlign={"end"}>
            <strong>Date: {formatDate(form.doDate)}</strong>
          </Typography>
        </Box>

        <Typography paragraph>Dear Sir,</Typography>
        <Typography paragraph>
          You are requested to kindly make delivery of the below mentioned container(s), whose details are as follows:
        </Typography>

        <table style={{ width: "80%", marginBottom: "5px", fontSize: "15px", borderCollapse: "collapse", lineHeight: "1.2" }}>
          <tbody>
            {[
              ["BL NO", `${form.blNo}  Date: ${formatDate(form.blDate)}`],
              ["MASTER BL NO", form.masterBlNo],
              ["Container No(s)", `${form.containerNo} ${form.containerType}`],
              ["Consignee", form.consignee],
              ["Cargo Description", form.cargoDesc],
              ["Delivery", form.delivery],
              ["No. of Packages", `${form.packages} ${form.packageType}`],
              ["Measurement", `${form.measurement} CBM`],
              ["Gross Wt.", `${form.grossWt} KGS`],
              ["Vessel / Voyage", form.vessel],
              ["Rotation IGM No", form.rotationIgm],
              ["Local IGM No.", form.localIgm],
              ["SMTP No.", form.smtpNo],
              ["Sub-Line No.", form.subLineNo],
              ["De-stuffing Station", form.destuffing],
            ].map(([label, value], index) => (
              <tr key={index}>
                <td style={{ padding: "2px 4px", whiteSpace: "nowrap", verticalAlign: "top" }}>
                  <strong>{label}</strong>
                </td>
                <td style={{ padding: "2px 4px", verticalAlign: "top" }}>:</td>
                <td style={{ padding: "2px 4px" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Typography><br /><br />Marks & Nos.</Typography>
        <Typography>
          This delivery order is valid till: <strong>{formatDate(form.validTill)}</strong>
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={2}>
          NOTE: NO MANUAL REVALIDATION OF DATE IS ALLOWED ON THIS DELIVERY ORDER, ONLY FRESH DELIVERY ORDER TO BE ACCEPTED.
        </Typography>

        <Typography variant="body2" align="center" mt={2}>
          (THIS IS A COMPUTER-GENERATED DOCUMENT AND DOES NOT REQUIRE A SEAL & SIGNATURE.)
        </Typography>
      </Paper>

      
            <Button
              variant="contained"
              color="primary"
              onClick={generatePDF}
              sx={{ mt: 3, px: 4, py: 1.5, fontWeight: "bold", borderRadius: "12px" }}
              disabled={isDownloading}
              startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : "📄"}
            >
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>

          <AnimatePresence>
            {openToast && (
              <Snackbar
                open={openToast}
                autoHideDuration={1500}
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setOpenToast(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                  variant="filled"
                  icon={
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      ✅
                    </motion.div>
                  }
                >
                  PDF downloaded successfully!
                </Alert>
              </Snackbar>
            )}
          </AnimatePresence>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}
