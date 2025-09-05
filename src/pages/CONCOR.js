import React, { useState } from "react";
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
  Snackbar,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

import logoBase64 from "../components/Img"; // <-- put your base64 logo here

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" },
  },
  typography: { fontFamily: "'Segoe UI', sans-serif" },
});

export default function CONCOR() {
  const [form, setForm] = useState({
    importerName: "",
    importerGST: "",
    chaName: "SREE EXIM SOLUTIONS",
    boeNo: "",
    boeDate: "",
    shippingLine: "",
    containerNo: "",
    importAppDate: "",
    importAppTime: "",
    cargoType: "",
    weight: "",
    packages: "",
    lclFcl: "",
    deliveryType: "",
    vehicle: "",
    equipment: "",
    paymentMode: "",
  });

  const [openToast, setOpenToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${("0" + d.getDate()).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getFullYear()}`;
  };

  const generatePDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
      // ---- Logo ----
      try {
        if (logoBase64) {
          doc.addImage(logoBase64, "PNG", 10, 8, 25, 25);
        }
      } catch (err) {
        console.warn("Logo not added:", err);
      }
  
      // ---- Header ----
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text("FORM No. WFD / F / 040", 200, 15, { align: "right" });
  
      doc.setFont("times", "bold");
      doc.setFontSize(16);
      doc.text("CONTAINER CORPORATION OF INDIA LTD.", 105, 22, { align: "center" });
  
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text("INLAND CONTAINER DEPOT,", 105, 29, { align: "center" });
      doc.text("WHITEFIELD, BANGALORE - 560 066", 105, 35, { align: "center" });
  
      doc.setFont("times", "bold");
      doc.setFontSize(13);
      doc.text("IMPORT APPLICATION", 105, 43, { align: "center" });
  
      // ---- Date (top right) ----
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text("Date :", 160, 50); // label
      doc.text(formatDate(form.importAppDate) || "", 180, 50); // value
  
      // ---- Body ----
      let y = 65;
      const lineGap = 8;
      doc.setFont("times", "normal");
      doc.setFontSize(12);
  
      doc.text("1. a) NAME OF THE IMPORTER :", 15, y);
      doc.text(form.importerName || "", 90, y);
      y += lineGap;
  
      doc.text("   b) Name & GST No. Details for", 15, y);
      doc.text(form.importerGST || "", 90, y);
      y += lineGap;
      doc.text("      which invoice to be generated", 15, y);
      y += lineGap;
  
      doc.text("2. NAME OF CHA :", 15, y);
      doc.text(form.chaName || "", 90, y);
      y += lineGap;
  
      doc.text("3. BILL OF ENTRY NO. & DATE :", 15, y);
      doc.text(`${form.boeNo || ""}   ${formatDate(form.boeDate)}`, 90, y);
      y += lineGap;
  
      doc.text("4. SHIPPING LINE :", 15, y);
      doc.text(form.shippingLine || "", 90, y);
      y += lineGap;
  
      doc.text("5. CONTAINER NO. :", 15, y);
      doc.text(form.containerNo || "", 90, y);
      y += lineGap;
  
      doc.text("6. CARGO DETAILS :", 15, y);
      doc.text(form.cargoType || "", 90, y);
      y += lineGap;
      doc.text("  (HAZARDOUS / NON-HAZARDOUS) :", 15, y);
      y += lineGap;
  
      doc.text("7. WEIGHT :", 15, y);
      doc.text(`${form.weight || ""} KGS`, 90, y);
      y += lineGap;
  
      doc.text("8. NO. OF PKGS :", 15, y);
      doc.text(`${form.packages || ""} PKG`, 90, y);
      y += lineGap;
  
      doc.text("9. LCL / FCL :", 15, y);
      doc.text(form.lclFcl || "", 90, y);
      y += lineGap;
  
      doc.text("10. TYPE OF DELIVERY (WH / DIRECT / OUTSIDE) :", 15, y);
      doc.text(form.deliveryType || "", 120, y);
      y += lineGap;
  
      doc.text("11. VEHICLE (LORRY / TEMPO / TRAILER) :", 15, y);
      doc.text(form.vehicle || "", 120, y);
      y += lineGap;
  
      doc.text("12. DETAILS OF EQUIPMENT REQUIRED :", 15, y);
      doc.text(form.equipment || "", 130, y);
      y += lineGap;
      doc.text("   (FORK / CRANE / MANUAL) :", 15, y);
      y += lineGap;
  
      doc.text("13. THE CHARGES FOR ABOVE ACTIVITY PAID BY CASH / DD / PDA A/c :", 15, y);
      y += lineGap;
      doc.text("    CODE", 15, y);
      doc.text(form.paymentMode || "", 120, y);
      y += lineGap * 3;
  
      // ---- Footer ----
      doc.text("for", 190, y, { align: "right" });
      y += lineGap;
      doc.text("Signature of the Applicant", 190, y, { align: "right" });
  
      // Save PDF
      doc.save("Concor_Import_Application.pdf");
      setOpenToast(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Check console.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  

  const cargoOptions = ["Hazardous", "Non-Hazardous"];
  const lclFclOptions = ["LCL", "FCL"];
  const deliveryOptions = ["WH", "Direct", "Outside"];
  const vehicleOptions = ["Lorry", "Tempo", "Trailer"];
  const equipmentOptions = ["Fork", "Crane", "Manual", "Kalmar"];
  const paymentOptions = ["Cash", "DD", "PDA A/c"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {/* --- Form --- */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
              CONCOR IMPORT APPLICATION FORM
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField type="date" label="Import App Date" name="importAppDate" value={form.importAppDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Importer Name" name="importerName" value={form.importerName} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Importer GST No." name="importerGST" value={form.importerGST} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="CHA Name" name="chaName" value={form.chaName} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Bill of Entry No." name="boeNo" value={form.boeNo} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type="date" label="Bill of Entry Date" name="boeDate" value={form.boeDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Shipping Line" name="shippingLine" value={form.shippingLine} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Container No." name="containerNo" value={form.containerNo} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Cargo Type" name="cargoType" value={form.cargoType} onChange={handleChange} fullWidth required>
                  {cargoOptions.map((o, i) => <MenuItem key={i} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Weight (KGS)" name="weight" value={form.weight} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="No. of Packages" name="packages" value={form.packages} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="LCL / FCL" name="lclFcl" value={form.lclFcl} onChange={handleChange} fullWidth required>
                  {lclFclOptions.map((o, i) => <MenuItem key={i} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Delivery Type" name="deliveryType" value={form.deliveryType} onChange={handleChange} fullWidth required>
                  {deliveryOptions.map((o, i) => <MenuItem key={i} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Vehicle" name="vehicle" value={form.vehicle} onChange={handleChange} fullWidth required>
                  {vehicleOptions.map((o, i) => <MenuItem key={i} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Equipment Required" name="equipment" value={form.equipment} onChange={handleChange} fullWidth required>
                  {equipmentOptions.map((o, i) => <MenuItem key={i} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Payment Mode" name="paymentMode" value={form.paymentMode} onChange={handleChange} fullWidth required>
                  {paymentOptions.map((o, i) => <MenuItem key={i} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* --- Preview --- */}
          <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Typography variant="h6" align="center" gutterBottom><strong>Preview</strong></Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: "200px 10px 1fr", rowGap: 1 }}>
              {[
                ["Importer Name", form.importerName],
                ["Importer GST No.", form.importerGST],
                ["CHA Name", form.chaName],
                ["Bill of Entry No.", form.boeNo],
                ["Bill of Entry Date", formatDate(form.boeDate)],
                ["Shipping Line", form.shippingLine],
                ["Container No.", form.containerNo],
                ["Import App. Date", formatDate(form.importAppDate)],
                ["Import App. Time", form.importAppTime],
                ["Cargo Type", form.cargoType],
                ["Weight", form.weight],
                ["No. of Packages", form.packages],
                ["LCL / FCL", form.lclFcl],
                ["Delivery Type", form.deliveryType],
                ["Vehicle", form.vehicle],
                ["Equipment Required", form.equipment],
                ["Payment Mode", form.paymentMode],
              ].map(([label, value], i) => (
                <React.Fragment key={i}>
                  <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                  <Typography>:</Typography>
                  <Typography>{value}</Typography>
                </React.Fragment>
              ))}
            </Box>
          </Paper>

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={generatePDF}
              sx={{ mt: 2, px: 4, py: 1.5, fontWeight: "bold", borderRadius: "12px" }}
              disabled={isDownloading}
              startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : "📄"}
            >
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>
          </Box>

          <AnimatePresence>
            {openToast && (
              <Snackbar
                open={openToast}
                autoHideDuration={2000}
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setOpenToast(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                  variant="filled"
                >
                  ✅ PDF downloaded successfully!
                </Alert>
              </Snackbar>
            )}
          </AnimatePresence>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}
