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

import logoBase64 from "../components/Demo"; // <-- put your base64 logo here

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

      // ---- Header with Logo ----
      try {
        if (logoBase64) {
          doc.addImage(logoBase64, "PNG", 10, 8, 25, 25);
        }
      } catch (err) {
        console.warn("Logo not added:", err);
      }

      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.text("FORM No. WFD / F / 040", 200, 15, { align: "right" });

      doc.setFontSize(16);
      doc.text("CONTAINER CORPORATION OF INDIA LTD.", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(
        "INLAND CONTAINER DEPOT., WHITEFIELD, BANGALORE - 560 066",
        105,
        27,
        { align: "center" }
      );

      doc.setLineWidth(0.3);
      doc.line(10, 36, 200, 36);

      let y = 45;
      const lineGap = 8;

      doc.setFont("times", "normal");
      doc.setFontSize(12);

      doc.text("1. a) Name of Importer :", 15, y);
      doc.text(form.importerName || "", 90, y);
      y += lineGap;

      doc.text("   b) Name & GST No. (for invoice) :", 15, y);
      doc.text(form.importerGST || "", 90, y);
      y += lineGap;

      doc.text("2. Name of CHA :", 15, y);
      doc.text(form.chaName || "", 90, y);
      y += lineGap;

      doc.text("3. Bill of Entry No. & Date :", 15, y);
      doc.text(`${form.boeNo || ""}   ${formatDate(form.boeDate)}`, 90, y);
      y += lineGap;

      doc.text("4. Shipping Line :", 15, y);
      doc.text(form.shippingLine || "", 90, y);
      y += lineGap;

      doc.text("5. Container No. :", 15, y);
      doc.text(form.containerNo || "", 90, y);
      y += lineGap;

      doc.text("   Import Application Date & Time :", 15, y);
      doc.text(
        `${formatDate(form.importAppDate)} ${form.importAppTime || ""}`,
        90,
        y
      );
      y += lineGap;

      doc.text("6. Cargo Details (Haz/Non-Haz) :", 15, y);
      doc.text(form.cargoType || "", 90, y);
      y += lineGap;

      doc.text("7. Weight :", 15, y);
      doc.text(`${form.weight} KGS`, 90, y);
      y += lineGap;

      doc.text("8. No. of Packages :", 15, y);
      doc.text(form.packages || "", 90, y);
      y += lineGap;

      doc.text("9. LCL / FCL :", 15, y);
      doc.text(form.lclFcl || "", 90, y);
      y += lineGap;

      doc.text("10. Type of Delivery (WH/Direct/Outside) :", 15, y);
      doc.text(form.deliveryType || "", 110, y);
      y += lineGap;

      doc.text("11. Vehicle (Lorry/Tempo/Trailer) :", 15, y);
      doc.text(form.vehicle || "", 110, y);
      y += lineGap;

      doc.text("12. Equipment Required (Fork/Crane/Manual) :", 15, y);
      doc.text(form.equipment || "", 130, y);
      y += lineGap;

      doc.text("13. Charges Payment Mode :", 15, y);
      doc.text(form.paymentMode || "", 90, y);
      y += lineGap * 3;

      // ---- Footer ----
      doc.text("for __________________________", 190, y, { align: "right" });
      y += lineGap;
      doc.text("Signature of the Applicant", 190, y, { align: "right" });

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
                <TextField label="Import App Time" name="importAppTime" value={form.importAppTime} onChange={handleChange} fullWidth />
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
